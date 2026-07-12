import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import { buildUpstreamPathLink } from '../../scripts/check-links.mjs';

const PATHS = ['docs/OPERATOR_WALKTHROUGH.md', 'ready.yml', 'src/cli/', 'infra/', '.kiro/hooks/'];

describe('Property 3: Upstream Link Format Pinning', () => {
  it('builds pinned upstream path URLs', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...PATHS),
        fc.stringMatching(/^[0-9a-f]{7,40}$/),
        (filePath, ref) => {
          const url = buildUpstreamPathLink(ref, filePath);
          expect(url).toBe(
            `https://github.com/jajera/pr-readiness-coach/tree/${ref}/${filePath}`,
          );
        },
      ),
      { numRuns: 100 },
    );
  });
});
