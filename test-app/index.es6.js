'use strict';
require('babel/polyfill');

const input = require('../src');

// Sensor support DOM elements
var orientationProvided = document.getElementById('orientationProvided');
var accelerationIncludingGravityProvided = document.getElementById('accelerationIncludingGravityProvided');
var accelerationProvided = document.getElementById('accelerationProvided');
var rotationRateProvided = document.getElementById('rotationRateProvided');

// Orientation DOM elements
var orientationAlphaRaw = document.getElementById('orientationAlphaRaw');
var orientationBetaRaw = document.getElementById('orientationBetaRaw');
var orientationGammaRaw = document.getElementById('orientationGammaRaw');

var orientationAlphaUnified = document.getElementById('orientationAlphaUnified');
var orientationBetaUnified = document.getElementById('orientationBetaUnified');
var orientationGammaUnified = document.getElementById('orientationGammaUnified');

// Acceleration including gravity DOM elements
var accelerationIncludingGravityXRaw = document.getElementById('accelerationIncludingGravityXRaw');
var accelerationIncludingGravityYRaw = document.getElementById('accelerationIncludingGravityYRaw');
var accelerationIncludingGravityZRaw = document.getElementById('accelerationIncludingGravityZRaw');

var accelerationIncludingGravityXUnified = document.getElementById('accelerationIncludingGravityXUnified');
var accelerationIncludingGravityYUnified = document.getElementById('accelerationIncludingGravityYUnified');
var accelerationIncludingGravityZUnified = document.getElementById('accelerationIncludingGravityZUnified');

// Acceleration DOM elements
var accelerationXRaw = document.getElementById('accelerationXRaw');
var accelerationYRaw = document.getElementById('accelerationYRaw');
var accelerationZRaw = document.getElementById('accelerationZRaw');

var accelerationXUnified = document.getElementById('accelerationXUnified');
var accelerationYUnified = document.getElementById('accelerationYUnified');
var accelerationZUnified = document.getElementById('accelerationZUnified');

// Rotation rate DOM elements
var rotationRateAlphaRaw = document.getElementById('rotationRateAlphaRaw');
var rotationRateBetaRaw = document.getElementById('rotationRateBetaRaw');
var rotationRateGammaRaw = document.getElementById('rotationRateGammaRaw');

var rotationRateAlphaUnified = document.getElementById('rotationRateAlphaUnified');
var rotationRateBetaUnified = document.getElementById('rotationRateBetaUnified');
var rotationRateGammaUnified = document.getElementById('rotationRateGammaUnified');

function roundValue(input) {
  if (input === undefined)
    return 'undefined';
  if (input === null)
    return 'null';

  return Math.round(input * 100) / 100;
}

function displayProvidedSensors(modules) {
  const [
    devicemotion,
    accelerationIncludingGravity,
    acceleration,
    rotationRate,
    deviceorientation,
    orientation
  ] = modules;

  if (orientation.isProvided) {
    orientationProvided.textContent = 'Yes';
    orientationProvided.classList.add('success');
    orientationProvided.classList.remove('danger');
  }

  if (accelerationIncludingGravity.isProvided) {
    accelerationIncludingGravityProvided.textContent = 'Yes';
    accelerationIncludingGravityProvided.classList.add('success');
    accelerationIncludingGravityProvided.classList.remove('danger');
  }
  
  if (acceleration.isProvided) {
    accelerationProvided.textContent = 'Yes';
    accelerationProvided.classList.add('success');
    accelerationProvided.classList.remove('danger');
  }
  
  if (rotationRate.isProvided) {
    rotationRateProvided.textContent = 'Yes';
    rotationRateProvided.classList.add('success');
    rotationRateProvided.classList.remove('danger');
  }
}

function displayDeviceorientationRaw(module) {
  if (module.isValid) {
    input.addListener('deviceorientation', (deviceorientation) => {
      orientationAlphaRaw.textContent = roundValue(deviceorientation[0]);
      orientationBetaRaw.textContent = roundValue(deviceorientation[1]);
      orientationGammaRaw.textContent = roundValue(deviceorientation[2]);
    });
  }
}

function displayDevicemotionRaw(module) {
  if (module.isValid) {
    input.addListener('devicemotion', (devicemotion) => {
      accelerationIncludingGravityXRaw.textContent = roundValue(devicemotion[0]);
      accelerationIncludingGravityYRaw.textContent = roundValue(devicemotion[1]);
      accelerationIncludingGravityZRaw.textContent = roundValue(devicemotion[2]);

      accelerationXRaw.textContent = roundValue(devicemotion[3]);
      accelerationYRaw.textContent = roundValue(devicemotion[4]);
      accelerationZRaw.textContent = roundValue(devicemotion[5]);

      rotationRateAlphaRaw.textContent = roundValue(devicemotion[6]);
      rotationRateBetaRaw.textContent = roundValue(devicemotion[7]);
      rotationRateGammaRaw.textContent = roundValue(devicemotion[8]);
    });
  }
}

function displayOrientation(module) {
  if (module.isValid) {
    input.addListener('orientation', (orientation) => {
      orientationAlphaUnified.textContent = roundValue(orientation[0]);
      orientationBetaUnified.textContent = roundValue(orientation[1]);
      orientationGammaUnified.textContent = roundValue(orientation[2]);
    });
  }
}

function displayAccelerationIncludingGravity(module) {
  if (module.isValid) {
    input.addListener('accelerationIncludingGravity', (accelerationIncludingGravity) => {
      accelerationIncludingGravityXUnified.textContent = roundValue(accelerationIncludingGravity[0]);
      accelerationIncludingGravityYUnified.textContent = roundValue(accelerationIncludingGravity[1]);
      accelerationIncludingGravityZUnified.textContent = roundValue(accelerationIncludingGravity[2]);
    });
  }
}

function displayAcceleration(module) {
  if (module.isValid) {
    input.addListener('acceleration', (acceleration) => {
      accelerationXUnified.textContent = roundValue(acceleration[0]);
      accelerationYUnified.textContent = roundValue(acceleration[1]);
      accelerationZUnified.textContent = roundValue(acceleration[2]);
    });
  }
}

function displayRotationRate(module) {
  if (module.isValid) {
    input.addListener('rotationRate', (rotationRate) => {
      rotationRateAlphaUnified.textContent = roundValue(rotationRate[0]);
      rotationRateBetaUnified.textContent = roundValue(rotationRate[1]);
      rotationRateGammaUnified.textContent = roundValue(rotationRate[2]);
    });
  }
}

(function() {
  input.init('devicemotion', 'accelerationIncludingGravity', 'acceleration', 'rotationRate', 'deviceorientation', 'orientation')
    .then((modules) => {
      const [
        devicemotion,
        accelerationIncludingGravity,
        acceleration,
        rotationRate,
        deviceorientation,
        orientation
      ] = modules;

      displayProvidedSensors(modules);
      displayDevicemotionRaw(devicemotion);
      displayAccelerationIncludingGravity(accelerationIncludingGravity);
      displayAcceleration(acceleration);
      displayRotationRate(rotationRate);
      displayDeviceorientationRaw(deviceorientation);
      displayOrientation(orientation)
    });
}());