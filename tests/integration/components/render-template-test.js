import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('render-template', 'Integration | Component | render template', {
  integration: true
});

test('it renders bare text', function(assert) {
  assert.expect(1);

  this.render(hbs`
    {{render-template templateString="abc"}}
  `);

  assert.equal(this.$().text().trim(), 'abc');
});

test('it renders bound values', function(assert) {
  assert.expect(2);

  this.set('a', 1);

  this.render(hbs`
    {{render-template templateString="{{a}}" props=(hash a=a)}}
  `);

  assert.equal(this.$().text().trim(), '1');

  this.set('a', 2);

  assert.equal(this.$().text().trim(), '2');
});

test('it renders helpers', function(assert) {
  assert.expect(1);

  this.set('a', 1);

  this.render(hbs`
    {{render-template templateString="{{concat a 2}}" props=(hash a=a)}}
  `);

  assert.equal(this.$().text().trim(), '12');
});

test('rerenders if `templateString` changes', function(assert) {
  assert.expect(2);

  this.set('templateString', '{{concat 1 2}}');

  this.render(hbs`
    {{render-template templateString=templateString}}
  `);

  assert.equal(this.$().text().trim(), '12');

  this.set('templateString', '{{concat 2 1}}');

  assert.equal(this.$().text().trim(), '21');
});