/**
 * @license Copyright 2019 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
 */
'use strict';

const AutocompleteCardNumber = require('../../../audits/form-autocomplete/cardnumber.js');

/* eslint-env jest */

describe('Autocomplete: cardnumber', () => {
  it('should pass with not applicable when no form fields are returned', () => {
    const artifacts = {
      FormFields: [],
    };

    const result = AutocompleteCardNumber.audit(artifacts);

    expect(result.notApplicable).toBe(true);
  });

  it('should pass with not applicable when form does not contain cardnumber field', () => {
    const artifacts = {
      FormFields: [
        {
          name: 'other',
          autocomplete: 'none',
        },
      ],
    };

    const result = AutocompleteCardNumber.audit(artifacts);

    expect(result.notApplicable).toBe(true);
  });

  // eslint-disable-next-line max-len
  it('should fail when form contains cardnumber field with incorrect autocomplete', () => {
    const artifacts = {
      FormFields: [
        {
          name: 'cardnumber',
          autocomplete: 'none',
          elementType: 'input',
          inputType: 'text',
          formPath: 'form',
        },
      ],
    };

    const result = AutocompleteCardNumber.audit(artifacts);

    expect(result.score).toBe(0);
  });

  it('should pass when cardnumber field is correctly tagged', () => {
    const artifacts = {
      FormFields: [
        {
          name: 'cardnumber',
          autocomplete: 'cc-number',
          elementType: 'input',
          inputType: 'text',
          formPath: 'form',
        },
      ],
    };

    const result = AutocompleteCardNumber.audit(artifacts);

    expect(result.score).toBe(1);
  });
});
