export type GIFDataObject = {
  url: string;
  id: string;
  images: {
    fixed_height: {
      mp4: string;
      webp: string;
    };
    original: {
      mp4: string;
    };
  };
};

export type GIFObject = {
  data: GIFDataObject[];
};
