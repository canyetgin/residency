declare module "*.lottie" {
  const content: string;
  export default content;
}

declare global {
  interface Window {
    navigation: Navigation;
  }
  var URLPattern: {
    prototype: URLPattern;
    new (input: any, baseURL?: string): URLPattern;
  };
}
