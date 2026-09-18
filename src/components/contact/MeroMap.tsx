'use client';

import { MapPin, Navigation, Phone } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useLocale } from 'next-intl';
import { branches } from '../../data/branches';

const mapboxStyle = 'mapbox://styles/mapbox/dark-v11';
const mainBranchCoordinates: [number, number] = [46.7291548, 24.6488506];

export default function MeroMap() {
  const locale = useLocale();
  const english = locale === 'en';
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<import('mapbox-gl').Map | null>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [status, setStatus] = useState<'idle' | 'loading' | 'ready' | 'error'>(
    process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN ? 'idle' : 'error',
  );

  useEffect(() => {
    const element = mapContainer.current;
    if (!element || shouldLoad) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: '300px' },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [shouldLoad]);

  useEffect(() => {
    if (!shouldLoad || !mapContainer.current || mapRef.current) return;
    const token = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
    if (!token) return;

    let cancelled = false;
    let map: import('mapbox-gl').Map | null = null;
    const markers: import('mapbox-gl').Marker[] = [];
    void import('mapbox-gl')
      .then(({ default: mapboxgl }) => {
        if (cancelled || !mapContainer.current) return;
        mapboxgl.accessToken = token;
        map = new mapboxgl.Map({
          container: mapContainer.current,
          style: mapboxStyle,
          center: mainBranchCoordinates,
          zoom: branches.length === 1 ? 13 : 10,
          attributionControl: false,
          dragRotate: false,
          touchZoomRotate: false,
          scrollZoom: false,
        });
        mapRef.current = map;
        map.addControl(new mapboxgl.NavigationControl({ showCompass: false }), 'top-left');
        map.addControl(new mapboxgl.AttributionControl({ compact: true }), 'bottom-right');

        for (const branch of branches) {
          const markerElement = document.createElement('button');
          markerElement.type = 'button';
          markerElement.className = 'mero-map-marker';
          markerElement.setAttribute('aria-label', english ? branch.name.en : branch.name.ar);
          markerElement.innerHTML = '<span aria-hidden="true">★</span>';

          const directions = `https://www.google.com/maps/dir/?api=1&destination=${branch.latitude},${branch.longitude}`;
          const popupContent = document.createElement('div');
          popupContent.className = `mero-map-popup ${english ? 'mero-map-popup-ltr' : 'mero-map-popup-rtl'}`;
          popupContent.innerHTML = `
            <strong>${english ? branch.name.en : branch.name.ar}</strong>
            <p>${english ? branch.address.en : branch.address.ar}</p>
            <div class="mero-map-popup-actions">
              <a href="tel:${branch.phone.replace(/\s/g, '')}">${english ? 'Call now' : 'اتصل الآن'}</a>
              <a href="${directions}" target="_blank" rel="noopener noreferrer">${english ? 'Get directions' : 'فتح الاتجاهات'}</a>
            </div>
          `;
          const popup = new mapboxgl.Popup({
            closeButton: true,
            closeOnClick: true,
            offset: 24,
            maxWidth: 'calc(100vw - 2rem)',
            className: 'mero-map-popup-container',
          }).setDOMContent(popupContent);

          popup.on('open', () => {
            window.requestAnimationFrame(() => {
              const popupElement = popup.getElement();
              const mapElement = mapContainer.current;
              if (!popupElement || !mapElement || !map) return;
              const popupRect = popupElement.getBoundingClientRect();
              const mapRect = mapElement.getBoundingClientRect();
              const padding = 12;
              const offsetX =
                popupRect.left < mapRect.left + padding
                  ? mapRect.left + padding - popupRect.left
                  : popupRect.right > mapRect.right - padding
                    ? mapRect.right - padding - popupRect.right
                    : 0;
              const offsetY =
                popupRect.top < mapRect.top + padding
                  ? mapRect.top + padding - popupRect.top
                  : popupRect.bottom > mapRect.bottom - padding
                    ? mapRect.bottom - padding - popupRect.bottom
                    : 0;
              if (offsetX || offsetY) map.panBy([offsetX, offsetY], { duration: 180 });
            });
          });

          const coordinates: [number, number] = [branch.longitude, branch.latitude];
          const marker = new mapboxgl.Marker({ element: markerElement, anchor: 'bottom' })
            .setLngLat(coordinates)
            .setPopup(popup)
            .addTo(map);
          markers.push(marker);
        }

        map.once('load', () => {
          if (cancelled || !map) return;
          map.resize();
          map.jumpTo({ center: mainBranchCoordinates, zoom: branches.length === 1 ? 14 : 10 });
          map.getStyle().layers?.forEach((layer) => {
            if (layer.type !== 'symbol' || !layer.layout?.['text-field']) return;
            map?.setLayoutProperty(layer.id, 'text-field', [
              'coalesce',
              ['get', 'name_en'],
              ['get', 'name_en:latin'],
              ['get', 'name:en'],
            ]);
          });
          if (branches.length > 1) {
            const bounds = new mapboxgl.LngLatBounds();
            branches.forEach((branch) => bounds.extend([branch.longitude, branch.latitude]));
            map.fitBounds(bounds, { padding: 70, maxZoom: 13, duration: 0 });
          }
          setStatus('ready');
        });
        map.on('error', () => {
          if (!cancelled) setStatus('error');
        });
      })
      .catch(() => {
        if (!cancelled) setStatus('error');
      });

    return () => {
      cancelled = true;
      markers.forEach((marker) => marker.remove());
      map?.remove();
      mapRef.current = null;
    };
  }, [english, shouldLoad]);

  const mainBranch = branches[0];
  const directions = `https://www.google.com/maps/dir/?api=1&destination=${mainBranch.latitude},${mainBranch.longitude}`;

  return (
    <div className="mero-map-card" dir={english ? 'ltr' : 'rtl'}>
      <div
        ref={mapContainer}
        className="mero-map-container"
        aria-label={english ? 'Mero branch map' : 'خريطة فروع Mero'}
      />
      {(status === 'idle' || status === 'loading') && (
        <div className="mero-map-skeleton" role="status">
          <MapPin size={28} aria-hidden="true" />
          <span>{english ? 'Loading map…' : 'جارٍ تحميل الخريطة…'}</span>
        </div>
      )}
      {status === 'error' && (
        <div className="mero-map-fallback">
          <MapPin size={28} aria-hidden="true" />
          <strong>{english ? mainBranch.name.en : mainBranch.name.ar}</strong>
          <span>{english ? mainBranch.address.en : mainBranch.address.ar}</span>
          <div className="mero-map-fallback-actions">
            <a href={`tel:${mainBranch.phone.replace(/\s/g, '')}`}>
              <Phone size={15} aria-hidden="true" />
              {english ? 'Call now' : 'اتصل الآن'}
            </a>
            <a href={directions} target="_blank" rel="noopener noreferrer">
              <Navigation size={15} aria-hidden="true" />
              {english ? 'Get directions' : 'فتح الاتجاهات'}
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
