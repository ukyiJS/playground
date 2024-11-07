import { describe, expect, it } from 'vitest';
import { get } from '../utils/get';

describe('get properties test', () => {
  const simpleObject = {
    simple: {
      a: 2,
    },
  };
  const complexObject = {
    complex: [{
      a1: null,
    }, {
      a1: {
        b1: {
          c1: {
            d1: 'complex[1].a1.b1.c1.d1',
            d2: 'complex[1].a1.b1.c1.d2',
            d3: 'complex[1].a1.b1.c1.d3',
          },
          c2: {
            d1: {
              e1: 'complex[1].a1.b1.c2.d1.e1',
            },
          },
        },
      },
    }],
  };
  const falsyObject = {
    falsy: {
      null: null,
      undefined,
      0: 0,
    },
  };

  it('#1 get properties', () => {
    const result = get(simpleObject, 'simple.a');

    console.log('#1 result:', result);
    expect(result).to.eql(2);
  });

  it('#2 get properties', () => {
    const result = get(simpleObject, 'simple.b.c', 'default');

    console.log('#2 result:', result);
    expect(result).to.eql('default');
  });

  it('#3 get properties', () => {
    const result = get(complexObject, 'complex[1].a1.b1.c1.d3');

    console.log('#3 result:', result);
    expect(result).to.eql('complex[1].a1.b1.c1.d3');
  });

  it('#4 get properties', () => {
    const result = get(complexObject, ['complex', '1', 'a1', 'b1', 'c2', 'd1', 'e1']);

    console.log('#4 result:', result);
    expect(result).to.eql('complex[1].a1.b1.c2.d1.e1');
  });
  it('#5 get properties', () => {
    const result = get(complexObject, 'a.bar.c', 'default');

    console.log('#5 result:', result);
    expect(result).to.eql('default');
  });

  it('#6 get properties', () => {
    const result = get(complexObject, null);

    console.log('#6 result:', result);
    expect(result).to.eql(null);
  });

  it('#7 get properties', () => {
    const result = get(falsyObject, 'falsy.null', 'default');

    console.log('#7 result:', result);
    expect(result).to.eql(null);
  });

  it('#8 get properties', () => {
    const result = get(falsyObject, 'falsy.undefined', 'default');

    console.log('#8 result:', result);
    expect(result).to.eql('default');
  });

  it('#9 get properties', () => {
    const result = get(falsyObject, ['falsy', '0'], 'default');

    console.log('#9 result:', result);
    expect(result).to.eql(0);
  });
});
