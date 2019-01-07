import addZero from '../../src/string/addZero';

describe('string:addZero', () => {
  test('addZero is work', () => {
    expect(addZero(2)).toBe('02');
    expect(addZero(11)).toBe('11');
  });
});
