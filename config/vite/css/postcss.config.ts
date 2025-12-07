import cssnano from 'cssnano'
import autoprefixer from 'autoprefixer'
import type { ViteEnvironment } from '../types'

export function createPostCSSPlugins(environment: ViteEnvironment): any[]  {
  const plugins: any[] = [autoprefixer()]

  if (environment.isProd) {
    plugins.push(
        cssnano({
          preset: [
            'default',
            {
              discardComments: { removeAll: true },
              normalizeWhitespace: true,
            },
          ],
        })
    );
  }

  return plugins
}
