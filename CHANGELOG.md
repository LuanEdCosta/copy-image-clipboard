# Changelog

This file documents all version releases.

## 2.1.2 - 2022-02-20

**Docs**

- Fix README.md image URLs to work fine in NPM

## 2.1.1 - 2022-02-20

**Docs**

- Add a pure JavaScript example to REAME.md

## 2.1.0 - 2022-02-19

**Features**

- Add JSDoc comments to all exported functions

**Fixes**

- Improve documentation organization and clarity

## 2.0.1 - 2021-09-09

**Fixes**

- Improve documentation readability

## 2.0.0 - 2021-09-06

The library was completely refactored, new functionality was added and several improvements were made in the documentation.

**Fixes**

- Check image type using the blob type instead of the image source
- Throw error if try to copy an unsupported type of image

**Features**

- Create function to copy blob to clipboard.
- Create function to get blob from image element.
- Create function to get blob from image source.
- Create function to convert blob to PNG.
- Create function to create image element with the desired source.
- Create function to check if a blob is a PNG image.
- Create function to check if a blob is a JPEG image.
- Create function to check if can copy images to clipboard.
- Create function to check if the permission to write data on clipboard was granted.

**Braking Changes**

- Build source code to ES6 instead of ES5.
- Remove default export. The library uses only named exports now.

**Improvements For Developers**

- Create automated tests with jest.
- Setup RollupJs to build the source code to multiple target environments.
- Use `tsc` to generate only type declarations.
- Setup husky + lint-staged to run commands on every commit.
- Create the `src/index.html` file to test changes while developing.
- Remove "any" types and define all types explicitly

## 1.0.1 - 2020-08-02

**Fixes**

- Improve documentation

## 1.0.0 - 2020-08-02

This is the first version of the library that includes the function to copy JPG and PNG images to clipboard.
