import 'chart.js';

declare module 'chart.js' {
  interface ZoomOptions {
    pan: {
      enabled: boolean;
      mode: string;
    };
    zoom: {
      enabled: boolean;
      mode: string;
    };
  }

  interface PluginOptionsByType<TType extends ChartType> {
    zoom?: ZoomOptions;
  }
}
