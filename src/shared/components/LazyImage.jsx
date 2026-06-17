import { useState } from 'react';
import { useInView } from 'react-intersection-observer';

export default function LazyImage({ src, alt, className = '', style = {}, fallback = '/images/brand/placeholder.jpg', aspectRatio = '1/1' }) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const { ref, inView } = useInView({ triggerOnce: true, rootMargin: '200px' });

  const imgSrc = error ? fallback : src;

  return (
    <div
      ref={ref}
      style={{ position: 'relative', aspectRatio, overflow: 'hidden', background: 'var(--border)', ...style }}
      className={className}
    >
      {/* Skeleton */}
      {!loaded && (
        <div
          style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(90deg, var(--border) 25%, var(--border-2) 50%, var(--border) 75%)',
            backgroundSize: '200% 100%',
            animation: 'shimmer 1.5s infinite',
          }}
        />
      )}
      {inView && (
        <img
          src={imgSrc}
          alt={alt}
          onLoad={() => setLoaded(true)}
          onError={() => { setError(true); setLoaded(true); }}
          style={{
            width: '100%', height: '100%',
            objectFit: 'cover',
            opacity: loaded ? 1 : 0,
            transition: 'opacity 0.3s ease',
          }}
          loading="lazy"
          decoding="async"
        />
      )}
    </div>
  );
}
