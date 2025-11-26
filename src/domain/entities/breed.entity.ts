// definir datos a guardar de cada raza
export interface BreedProps {
  id: string;
  name: string;
  origin?: string;
  temperament?: string;
  weight?: string;
  imageUrl?: string;
}

export class Breed {
  constructor(public props: BreedProps) {}
  get id() {
    return this.props.id;
  }
  get name() {
    return this.props.name;
  }
  get origin() {
    return this.props.origin;
  }
  get temperament() {
    return this.props.temperament;
  }
  get weight() {
    return this.props.weight;
  }
  get imageUrl() {
    return this.props.imageUrl;
  }
}

export interface BreedApiResponse {
  id: string;
  name: string;
  origin?: string;
  temperament?: string;
  weight?: { metric?: string; imperial?: string };
  image?: { url: string };
}

export interface ImageApiResponse {
  id: string;
  url: string;
  breeds?: BreedApiResponse[];
}
