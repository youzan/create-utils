import tozhCN from '../../src/money/tozhCN';

describe('money:tozhCN', () => {
  test('100', () => {
    expect(tozhCN(100)).toBe('壹佰元整');
  });

  test('string error', () => {
    const data = 'exception';
    expect(() => tozhCN(data)).toThrowError();
  });
});
