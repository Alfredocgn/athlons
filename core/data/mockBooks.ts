export interface Book {
  id: string;
  title: string;
  author: string;
  coverImageUrl: string;
}

export const bookData: Book[] = [
  {
    id: "1",
    title: "Meditations",
    author: "Marcus Aurelius",
    coverImageUrl:
      "https://m.media-amazon.com/images/I/71FCbiv0tTL._SL1360_.jpg",
  },
  {
    id: "2",
    title: "The Obstacle Is the Way",
    author: "Ryan Holiday",
    coverImageUrl:
      "https://m.media-amazon.com/images/I/81aRj4UCGSL._SL1500_.jpg",
  },
  {
    id: "3",
    title: "Man's Search for Meaning",
    author: "Viktor E. Frankl",
    coverImageUrl:
      "https://m.media-amazon.com/images/I/81UhnGT7BvL._SL1500_.jpg",
  },
  {
    id: "4",
    title: "Can't Hurt Me",
    author: "David Goggins",
    coverImageUrl:
      "https://m.media-amazon.com/images/I/81VpFFpZTtL._SL1500_.jpg",
  },
];
