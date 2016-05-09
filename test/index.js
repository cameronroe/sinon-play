import { expect } from 'chai';
import sinon from 'sinon';

describe('playing with sinon', () => {
  

  // spies are basically what they sound like, they spy on functions/objects
  // and allow you to assert what those functions/objects have done when running
  // them through your code. These spys can be used for operations that might be happening within 
  // your functions where you need to confirm that data is getting passed correctly, objects are getting
  // created, and things are getting called the right way. If you interact with a database, you may
  // want to spy on a database method to see if it was called within a function, what it's arguments were,
  // and what it returned. It should be known that spys are there to spy, they give you ways to assert what happened
  // to an anonnymous function or a replaced function existing already in the code. They don't add any new functionality,
  // and that should be left to stubs.
  // 
  // Think of spies as a way to test the "pulling" of your code. Does it do things the way you want?
  // Is it pulling the right way?
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

    it('should call identify which spy was called before the other', () => {
      let spyA = sinon.spy();
      let spyB = sinon.spy();
      spyA()
      spyB()

      expect(spyA.calledBefore(spyB)).to.be.true;
      expect(spyB.calledAfter(spyA)).to.be.true;
    });

    it('should call spy with only certain arguments', () => {
      let spyA = sinon.spy();
      spyA(3, 2, 1);

      expect(spyA.calledWithExactly(3, 2, 1)).to.be.true;
      expect(spyA.calledWithExactly(0)).to.be.false;
      expect(spyA.calledWith(3)).to.be.true;
      expect(spyA.calledWith(3, 2)).to.be.true;
    });

    it('should call a spy as a new contstructor', () => {
      let spy = sinon.spy();
      let instance = new spy();

      expect(spy.calledWithNew()).to.be.true;
    });

    xit('should throw an error', () => {
      let throwIt = () => { throw new Error('Threw error'); };
      let spy = sinon.spy(throwIt);
      // something is strange here. I'm not sure why this
      // throws when I'm trying to test it to throw. When I 
      // call throwIt(). The entire test breaks. I'm not sure how to use
      // .threw() very well.
      expect(spy.threw()).to.be.true;
    });

    it('should return the correct object', () => {
      let obj = { name: 'Sinon' };
      let func = () => { return obj };
      let spy = sinon.spy(func);

      spy();
      
      expect(spy.returned(obj)).to.be.true;
    });

    it('should call with the correct this value', () => {
      let obj = { name: 'Sinon' };
      let spy = sinon.spy();
      
      spy.call(obj);

      expect(spy.thisValues[0]).to.equal(obj);
    });

    // stubs are like spies, however they also add functionality and
    // can contain custom behavior that could return or throw. They can
    // also call different parameters as callbacks. 
    // 
    // Think of stubs as the "pushing" pieces for your code. How does your code react to
    // different code "pushing" it around? You can push code in different
    // directions versus just making sure it's pulling effectively.
    describe('stubs', () => {
      
      it('should return different values on subsequent calls', () =>  {
        let stub = sinon.stub();

        stub.onCall(0).returns(0);
        stub.onCall(1).returns(1);

        expect(stub()).to.equal(0);
        expect(stub()).to.equal(1);
      });

      it('should return the same value on subsequent calles', () => {
        let stub = sinon.stub();
        stub.returns(0);
        
        expect(stub()).to.equal(0);
        expect(stub()).to.equal(0);
        expect(stub()).to.equal(0);
      });

      it('should throw', () => {
        let stub = sinon.stub();
        let err = new Error('Wrong!');
        stub.throws(err);
        let spy = sinon.spy(function () {
          stub();
        });
        
        expect(spy.threw()).to.be.true;
      });

    });















  });

});