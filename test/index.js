import { expect } from 'chai';
import sinon from 'sinon';

describe('playing with sinon', () => {
  

  describe('spys', () => {
    
    it('should call a spy', () => {
      let spy = sinon.spy();
      spy();

      expect(spy.called).to.be.true;
    });

    it('should call a spy with the argument 1', () => {
      let spy = sinon.spy();
      spy(1);

      expect(spy.calledWith(1)).to.be.true;
    });

    it('should call a spy once', () => {
      let spy = sinon.spy();
      spy();

      expect(spy.calledOnce).to.be.true;
      expect(spy.calledTwice).to.be.false;
    });

    it('should have a call count', () => {
      let spy = sinon.spy();
      spy();
      expect(spy.callCount).to.equal(1);

      spy();
      expect(spy.callCount).to.equal(2);
    });

    it('should call the spy with a new this value', () => {
      let obj = {};
      let message = 'new this';
      let spy = sinon.spy();
      spy.call(obj, message);

      expect(spy.calledOn(obj)).to.be.true;
      expect(spy.calledWith(message)).to.be.true;
    });

  });

});