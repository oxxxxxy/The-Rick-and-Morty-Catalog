import makeUrqlClientDecorator from '@urql/generateWrapper';

makeUrqlClientDecorator('./generated.ts', './generatedUrqlClientWrapper.ts');
