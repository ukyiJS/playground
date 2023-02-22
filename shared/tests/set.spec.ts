import { expect, it } from 'vitest';
import { set } from '../utils/set';

it('#1 set properties', () => {
  const object = { foo: [{ bar: { c: 3 } }] } as ObjectLiteral;
  set(object, 'foo[0].bar.c', 4);
  console.log('### result', JSON.stringify(object, null, 2));

  expect(object.foo[0].bar.c).to.eql(4);
});

it('#2 set properties', () => {
  const object = { foo: [{ bar: { c: 3 } }] } as ObjectLiteral;
  set(object, ['x', '0', 'y', 'z'], 5);
  console.log('### result', JSON.stringify(object, null, 2));

  expect(object.x[0].y.z).to.eql(5);
});
