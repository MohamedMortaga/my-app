"use server";
import type { IBrand } from '@/app/interfaces/brand.interface';

interface BrandsApiResponse {
  data: IBrand[];
}

function isBrandsApiResponse(x: unknown): x is BrandsApiResponse {
  if (typeof x !== 'object' || x === null) return false;
  const data = (x as { data?: unknown }).data;
  if (!Array.isArray(data)) return false;
  return data.every(
    (b) =>
      typeof b === 'object' &&
      b !== null &&
      typeof (b as IBrand)._id === 'string' &&
      typeof (b as IBrand).name === 'string' &&
      typeof (b as IBrand).slug === 'string' &&
      typeof (b as IBrand).image === 'string'
  );
}

export async function getBrands(): Promise<{ data: IBrand[]; error?: string }> {
  try {
    const res = await fetch('https://ecommerce.routemisr.com/api/v1/brands', {
      next: { revalidate: 150, tags: ['brands'] },
      // Or: cache: 'no-store' if you want SSR only
    });

    if (!res.ok) {
      const msg = `Failed to fetch brands: ${res.status} ${res.statusText}`;
      console.error(msg);
      return { data: [], error: msg };
    }

    const json: unknown = await res.json();
    if (!isBrandsApiResponse(json)) {
      const msg = 'Unexpected brands API shape';
      console.error(msg, json);
      return { data: [], error: msg };
    }

    return { data: json.data };
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Unknown error';
    console.error('Brands fetch error:', msg);
    return { data: [], error: msg };
  }
}
