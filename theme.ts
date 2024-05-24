'use client';

import { Combobox, Input, Modal, NumberInput, Pagination, Select, createTheme, rem } from '@mantine/core';

import { YearPickerInput } from '@mantine/dates';
import classes from './theme.module.scss';

export const theme = createTheme({
  spacing: {
    xxxs: rem(4),
    xxs: rem(8),
    xs: rem(10),
    sm: rem(14),
    md: rem(16),
    lg: rem(24),
  },
  colors: {
    appColors: [
      '#7b7c88',
      '#acadb9',
      '#d5d6dc',
      '#eaebed',
      '#f5f5f6',
      '#541f9d',
      '#9854f6',
      '#bd93f7',
      '#d1b4f8',
      '#e5d5fa',
      '#f2ebf9',
      '#fab005',
    ]
  },
  fontFamily: '"Inter", sans-serif',
  fontSmoothing: true,
  fontSizes: {
    xxs: rem(10),
    xs: rem(12),
    sm: rem(14),
    md: rem(16),
    lg: rem(24),
    xl: rem(32),
    xxl: rem(40),
  },
  headings: {
    sizes: {
      h1: { fontSize: rem(32) },
      h2: { fontSize: rem(28) },
      h3: { fontSize: rem(24) },
      h4: { fontSize: rem(20) },
      h5: { fontSize: rem(16) }
    },
  },
  components: {
    Input: Input.extend({
      classNames: {
        input: classes.input,
      },
    }),

    InputWrapper: Input.Wrapper.extend({
      classNames: {
        label: classes.label,
        error: classes.error,
      },
    }),

    Combobox: Combobox.extend({
      classNames: {
        dropdown: classes.dropdown,
        option: classes.option
      }
    }),

    Select: Select.extend({
      classNames: {
        option: classes.option,
      }
    }),
    NumberInput: NumberInput.extend({
      classNames: {
        controls: classes.controls,
        control: classes.control,
      }
    }),

    Modal: Modal.extend({
      classNames: {
        body: classes.modalBody,
      }
    }),
    Pagination: Pagination.extend({
      classNames: {
        dots: classes.paginationDots
      }
    }),
    YearPickerInput: YearPickerInput.extend({
      classNames:{
        yearsListCell: classes.yearsListCell
      }
    })
  },
});
