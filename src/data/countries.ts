export type CountryFact = {
  name: string
  flag: string
  aliases?: string[]
  capital: string
  population: number
  language: string
  region: string
  funFact: string
}

export const countryFacts: CountryFact[] = [
  {
    name: 'Japan', flag: '🇯🇵', capital: 'Tokyo', population: 125700000,
    language: 'Japanese', region: 'Asia',
    funFact: 'Japan has more than 3 million vending machines — one for every 40 people.',
  },
  {
    name: 'Brazil', flag: '🇧🇷', capital: 'Brasília', population: 215300000,
    language: 'Portuguese', region: 'South America',
    funFact: 'Brazil contains 60% of the Amazon rainforest, the largest on Earth.',
  },
  {
    name: 'Nigeria', flag: '🇳🇬', capital: 'Abuja', population: 218500000,
    language: 'English', region: 'Africa',
    funFact: 'Nigeria is Africa\'s most populous country and home to Nollywood, the world\'s second-largest film industry.',
  },
  {
    name: 'Australia', flag: '🇦🇺', capital: 'Canberra', population: 26500000,
    language: 'English', region: 'Oceania',
    funFact: 'Australia has around 50 million kangaroos — nearly twice the human population.',
  },
  {
    name: 'Egypt', flag: '🇪🇬', capital: 'Cairo', population: 104000000,
    language: 'Arabic', region: 'Africa',
    funFact: 'Egypt\'s pyramids are so old that Cleopatra lived closer in time to us than to their builders.',
  },
  {
    name: 'Canada', flag: '🇨🇦', capital: 'Ottawa', population: 38200000,
    language: 'English/French', region: 'North America',
    funFact: 'Canada has the world\'s longest coastline, stretching over 202,000 km.',
  },
  {
    name: 'India', flag: '🇮🇳', capital: 'New Delhi', population: 1428600000,
    language: 'Hindi', region: 'Asia',
    funFact: 'India produces over 1,800 films per year — more than any other country on Earth.',
  },
  {
    name: 'Germany', flag: '🇩🇪', capital: 'Berlin', population: 84300000,
    language: 'German', region: 'Europe',
    funFact: 'Germany has over 1,500 beer varieties brewed across roughly 1,300 breweries.',
  },
  {
    name: 'Kenya', flag: '🇰🇪', capital: 'Nairobi', population: 54000000,
    language: 'Swahili', region: 'Africa',
    funFact: 'Kenya\'s Great Rift Valley stretches 6,000 km and is clearly visible from space.',
  },
  {
    name: 'Mexico', flag: '🇲🇽', capital: 'Mexico City', population: 128400000,
    language: 'Spanish', region: 'North America',
    funFact: 'Mexico City is built on a drained lake bed and sinks about 50 cm every year.',
  },
  {
    name: 'South Korea', flag: '🇰🇷', capital: 'Seoul', population: 51700000,
    language: 'Korean', region: 'Asia',
    funFact: 'South Korea has the world\'s fastest average internet speed and highest smartphone penetration rate.',
  },
  {
    name: 'Argentina', flag: '🇦🇷', capital: 'Buenos Aires', population: 45600000,
    language: 'Spanish', region: 'South America',
    funFact: 'Argentina has more psychiatrists per capita than almost any other nation on Earth.',
  },
  {
    name: 'Norway', flag: '🇳🇴', capital: 'Oslo', population: 5400000,
    language: 'Norwegian', region: 'Europe',
    funFact: 'Norway invented the paper clip and has the world\'s longest road tunnel at 24.5 km.',
  },
  {
    name: 'South Africa', flag: '🇿🇦', capital: 'Pretoria', population: 59600000,
    language: 'Zulu', region: 'Africa',
    funFact: 'South Africa is the only country to have voluntarily dismantled its nuclear weapons program.',
  },
  {
    name: 'France', flag: '🇫🇷', capital: 'Paris', population: 68000000,
    language: 'French', region: 'Europe',
    funFact: 'France is the world\'s most-visited country with roughly 90 million tourists each year.',
  },
  {
    name: 'United States', flag: '🇺🇸',
    aliases: ['usa', 'america', 'united states of america', 'us'],
    capital: 'Washington D.C.', population: 331000000,
    language: 'English', region: 'North America',
    funFact: 'The US has produced more Nobel Prize winners than any other nation.',
  },
  {
    name: 'China', flag: '🇨🇳', capital: 'Beijing', population: 1412000000,
    language: 'Mandarin', region: 'Asia',
    funFact: 'China\'s railway network spans 150,000 km — enough to circle the Earth nearly four times.',
  },
  {
    name: 'United Kingdom', flag: '🇬🇧',
    aliases: ['uk', 'great britain', 'britain', 'england'],
    capital: 'London', population: 67300000,
    language: 'English', region: 'Europe',
    funFact: 'The UK gave the world the steam engine, the World Wide Web, and association football.',
  },
  {
    name: 'Italy', flag: '🇮🇹', capital: 'Rome', population: 60300000,
    language: 'Italian', region: 'Europe',
    funFact: 'Italy holds more UNESCO World Heritage Sites than any other country in the world.',
  },
  {
    name: 'Spain', flag: '🇪🇸', capital: 'Madrid', population: 47400000,
    language: 'Spanish', region: 'Europe',
    funFact: 'Spain is home to the world\'s second-oldest restaurant, Sobrino de Botín, open since 1725.',
  },
  {
    name: 'Indonesia', flag: '🇮🇩', capital: 'Jakarta', population: 273500000,
    language: 'Indonesian', region: 'Asia',
    funFact: 'Indonesia is the world\'s largest archipelago with over 17,000 islands spanning 5,000 km.',
  },
  {
    name: 'Pakistan', flag: '🇵🇰', capital: 'Islamabad', population: 231400000,
    language: 'Urdu', region: 'Asia',
    funFact: 'Pakistan hosts the world\'s second-largest salt mine — the Khewra Salt Mine — active for 700 years.',
  },
  {
    name: 'Bangladesh', flag: '🇧🇩', capital: 'Dhaka', population: 169400000,
    language: 'Bengali', region: 'Asia',
    funFact: 'Bangladesh\'s Sundarbans is the world\'s largest river delta and mangrove forest.',
  },
  {
    name: 'Russia', flag: '🇷🇺', capital: 'Moscow', population: 144100000,
    language: 'Russian', region: 'Europe',
    funFact: 'Russia spans 11 time zones and covers over 11% of all land on Earth.',
  },
  {
    name: 'Thailand', flag: '🇹🇭', capital: 'Bangkok', population: 71800000,
    language: 'Thai', region: 'Asia',
    funFact: 'Thailand\'s capital Bangkok has an official ceremonial name of 168 characters.',
  },
  {
    name: 'Vietnam', flag: '🇻🇳', capital: 'Hanoi', population: 97300000,
    language: 'Vietnamese', region: 'Asia',
    funFact: 'Vietnam is the world\'s second-largest coffee exporter, right behind Brazil.',
  },
  {
    name: 'Philippines', flag: '🇵🇭', capital: 'Manila', population: 111000000,
    language: 'Filipino', region: 'Asia',
    funFact: 'The Philippines has over 7,641 islands and more than 170 distinct languages.',
  },
  {
    name: 'Malaysia', flag: '🇲🇾', capital: 'Kuala Lumpur', population: 33500000,
    language: 'Malay', region: 'Asia',
    funFact: 'Malaysia\'s rainforest is over 130 million years old — more than twice the age of the Amazon.',
  },
  {
    name: 'Morocco', flag: '🇲🇦', capital: 'Rabat', population: 37500000,
    language: 'Arabic', region: 'Africa',
    funFact: 'Morocco hosts the world\'s oldest university — the University of Al Quaraouiyine, founded in 859 AD.',
  },
  {
    name: 'Ghana', flag: '🇬🇭', capital: 'Accra', population: 33500000,
    language: 'English', region: 'Africa',
    funFact: 'Ghana was the first sub-Saharan African country to gain independence, in 1957.',
  },
  {
    name: 'Ethiopia', flag: '🇪🇹', capital: 'Addis Ababa', population: 126500000,
    language: 'Amharic', region: 'Africa',
    funFact: 'Ethiopia is the only African country with its own ancient alphabet, Ge\'ez script.',
  },
  {
    name: 'Colombia', flag: '🇨🇴', capital: 'Bogotá', population: 51900000,
    language: 'Spanish', region: 'South America',
    funFact: 'Colombia is the only South American country with coastlines on both the Pacific and Atlantic.',
  },
  {
    name: 'Peru', flag: '🇵🇪', capital: 'Lima', population: 33000000,
    language: 'Spanish', region: 'South America',
    funFact: 'Peru was the heart of the Inca Empire and is home to the lost citadel of Machu Picchu.',
  },
  {
    name: 'Chile', flag: '🇨🇱', capital: 'Santiago', population: 19200000,
    language: 'Spanish', region: 'South America',
    funFact: 'Chile is the world\'s longest country, stretching 4,300 km from north to south.',
  },
  {
    name: 'Netherlands', flag: '🇳🇱', capital: 'Amsterdam', population: 17600000,
    language: 'Dutch', region: 'Europe',
    funFact: 'The Netherlands has about 23 million bicycles for only 17 million people.',
  },
  {
    name: 'Sweden', flag: '🇸🇪', capital: 'Stockholm', population: 10400000,
    language: 'Swedish', region: 'Europe',
    funFact: 'Sweden invented the zipper, Bluetooth, and the three-point seatbelt.',
  },
  {
    name: 'Poland', flag: '🇵🇱', capital: 'Warsaw', population: 37800000,
    language: 'Polish', region: 'Europe',
    funFact: 'Poland\'s Białowieża Forest is the last and largest primeval forest remaining in lowland Europe.',
  },
  {
    name: 'Switzerland', flag: '🇨🇭', capital: 'Bern', population: 8700000,
    language: 'German', region: 'Europe',
    funFact: 'Switzerland has over 7,000 lakes and has maintained armed neutrality in all conflicts since 1815.',
  },
  {
    name: 'Greece', flag: '🇬🇷', capital: 'Athens', population: 10700000,
    language: 'Greek', region: 'Europe',
    funFact: 'Greece has more archaeological museums per square kilometre than any other country.',
  },
  {
    name: 'Ukraine', flag: '🇺🇦', capital: 'Kyiv', population: 43500000,
    language: 'Ukrainian', region: 'Europe',
    funFact: 'Ukraine is the largest country with its entire territory within Europe.',
  },
  {
    name: 'Turkey', flag: '🇹🇷', capital: 'Ankara', population: 85300000,
    language: 'Turkish', region: 'Asia/Europe',
    funFact: 'Turkey straddles two continents and is home to the ancient legendary city of Troy.',
  },
  {
    name: 'Saudi Arabia', flag: '🇸🇦', capital: 'Riyadh', population: 35600000,
    language: 'Arabic', region: 'Asia',
    funFact: 'Saudi Arabia is the world\'s largest oil exporter and has no permanent rivers.',
  },
  {
    name: 'Iran', flag: '🇮🇷', capital: 'Tehran', population: 85900000,
    language: 'Persian', region: 'Asia',
    funFact: 'Iran is one of the world\'s oldest civilisations — the Persian Empire is over 2,500 years old.',
  },
  {
    name: 'Israel', flag: '🇮🇱', capital: 'Jerusalem', population: 9200000,
    language: 'Hebrew', region: 'Asia',
    funFact: 'Israel has more startup companies per capita than any other country on Earth.',
  },
  {
    name: 'Jordan', flag: '🇯🇴', capital: 'Amman', population: 10200000,
    language: 'Arabic', region: 'Asia',
    funFact: 'Jordan\'s ancient city of Petra is carved entirely from rose-red sandstone cliffs.',
  },
  {
    name: 'United Arab Emirates', flag: '🇦🇪', aliases: ['uae'],
    capital: 'Abu Dhabi', population: 9900000,
    language: 'Arabic', region: 'Asia',
    funFact: 'The UAE is home to the Burj Khalifa — the world\'s tallest building at 828 metres.',
  },
  {
    name: 'New Zealand', flag: '🇳🇿', capital: 'Wellington', population: 5100000,
    language: 'English', region: 'Oceania',
    funFact: 'New Zealand was the first country in the world to grant women the right to vote, in 1893.',
  },
  {
    name: 'Denmark', flag: '🇩🇰', capital: 'Copenhagen', population: 5900000,
    language: 'Danish', region: 'Europe',
    funFact: 'Denmark consistently ranks as one of the happiest countries on Earth and invented LEGO.',
  },
  {
    name: 'Czech Republic', flag: '🇨🇿', aliases: ['czechia'],
    capital: 'Prague', population: 10800000,
    language: 'Czech', region: 'Europe',
    funFact: 'The Czech Republic consumes more beer per capita than any other country — 140+ litres per person per year.',
  },
  {
    name: 'Portugal', flag: '🇵🇹', capital: 'Lisbon', population: 10300000,
    language: 'Portuguese', region: 'Europe',
    funFact: 'Portugal is the oldest country in Europe with its current borders, established in 1139 AD.',
  },
  {
    name: 'Senegal', flag: '🇸🇳', capital: 'Dakar', population: 17200000,
    language: 'French', region: 'Africa',
    funFact: 'Senegal\'s capital Dakar is the westernmost city on the African mainland.',
  },
  {
    name: 'Kazakhstan', flag: '🇰🇿', capital: 'Astana', population: 19000000,
    language: 'Kazakh', region: 'Asia',
    funFact: 'Kazakhstan is the world\'s largest landlocked country, covering 2.7 million km².',
  },
  {
    name: 'Sri Lanka', flag: '🇱🇰', capital: 'Colombo', population: 22000000,
    language: 'Sinhala', region: 'Asia',
    funFact: 'Sri Lanka was the first country to elect a female head of government, in 1960.',
  },
  {
    name: 'Cuba', flag: '🇨🇺', capital: 'Havana', population: 11200000,
    language: 'Spanish', region: 'North America',
    funFact: 'Cuba has one of the world\'s highest literacy rates at over 99%.',
  },
]

export const getCountryPool = () => [...countryFacts]
