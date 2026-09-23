declare module '*?sizes[]=300,sizes[]=600,sizes[]=1024' {
  const content: {
    src: string;
    srcSet: string;
    images: Array<{ src: string; width: number }>;
  };
  export default content;
}
