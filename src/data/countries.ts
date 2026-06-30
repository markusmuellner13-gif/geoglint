export type CountryFact = {
  name: string
  capital: string
  population: number
  language: string
  region: string
  funFact: string
}

export const countryFacts: CountryFact[] = [
  {
    name: 'Japan',
    capital: 'Tokyo',
    population: 125836021,
    language: 'Japanese',
    region: 'Asia',
    funFact: 'The country has more vending machines than people might expect.'
  },
  {
    name: 'Brazil',
    capital: 'Brasília',
    population: 216422446,
    language: 'Portuguese',
    region: 'South America',
    funFact: 'It spans a huge range of climates, from rainforest to snow.'
  },
  {
    name: 'Nigeria',
    capital: 'Abuja',
    population: 223804632,
    language: 'English',
    region: 'Africa',
    funFact: 'It is one of the most linguistically diverse countries on Earth.'
  },
  {
    name: 'Australia',
    capital: 'Canberra',
    population: 26869614,
    language: 'English',
    region: 'Oceania',
    funFact: 'Its mainland is the smallest continent but the sixth-largest country.'
  },
  {
    name: 'Egypt',
    capital: 'Cairo',
    population: 112716599,
    language: 'Arabic',
    region: 'Africa',
    funFact: 'The Sahara is so vast that it can swallow entire countries in scale.'
  },
  {
    name: 'Canada',
    capital: 'Ottawa',
    population: 41000000,
    language: 'English',
    region: 'North America',
    funFact: 'It has the world’s longest coastline.'
  },
  {
    name: 'India',
    capital: 'New Delhi',
    population: 1428627663,
    language: 'Hindi',
    region: 'Asia',
    funFact: 'It has more than 2,000 ethnic groups and 22 official languages.'
  },
  {
    name: 'Germany',
    capital: 'Berlin',
    population: 84342000,
    language: 'German',
    region: 'Europe',
    funFact: 'The Autobahn has stretches with no enforced speed limit.'
  },
  {
    name: 'Kenya',
    capital: 'Nairobi',
    population: 55100586,
    language: 'Swahili',
    region: 'Africa',
    funFact: 'It is home to the Great Rift Valley and iconic wildlife safaris.'
  },
  {
    name: 'Mexico',
    capital: 'Mexico City',
    population: 128271248,
    language: 'Spanish',
    region: 'North America',
    funFact: 'It has more Spanish speakers than Spain itself.'
  },
  {
    name: 'South Korea',
    capital: 'Seoul',
    population: 51780579,
    language: 'Korean',
    region: 'Asia',
    funFact: 'It is famous for one of the fastest internet networks in the world.'
  },
  {
    name: 'Argentina',
    capital: 'Buenos Aires',
    population: 46044703,
    language: 'Spanish',
    region: 'South America',
    funFact: 'Its tango comes from immigrant neighborhoods in the late 1800s.'
  },
  {
    name: 'Norway',
    capital: 'Oslo',
    population: 5455422,
    language: 'Norwegian',
    region: 'Europe',
    funFact: 'It has one of the highest life expectancies in the world.'
  },
  {
    name: 'South Africa',
    capital: 'Pretoria',
    population: 63850000,
    language: 'Zulu',
    region: 'Africa',
    funFact: 'It has three capital cities: Pretoria, Cape Town, and Bloemfontein.'
  },
  {
    name: 'France',
    capital: 'Paris',
    population: 67900000,
    language: 'French',
    region: 'Europe',
    funFact: 'The country is home to the world’s most visited museum.'
  }
]

export const getCountryPool = () => [...countryFacts]
