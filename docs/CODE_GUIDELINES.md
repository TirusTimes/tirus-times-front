# Code Guidelines

## Table of Contents

- [Code Guidelines](#code-guidelines)

  - [Table of Contents](#table-of-contents)
  - [Architecture](#architecture)

    - [Folder Structure](#folder-structure)

  - [Design Patterns](#design-patterns)

    - [Functional Components](#functional-components)
    - [Memoization](#memoization)
      - [useCallback](#usecallback)
      - [Arrow Functions](#arrow-functions)
      
  - [Assets](#assets)
  - [Conventions](#conventions)
    - [Constants](#constants)
      - [Local Constants](#local-constants)
      - [Global Constants](#global-constants)
    - [Enums](#enums)
    - [Components](#components)
    - [Props](#props)
    - [Styles](#styles)
      - [Local Styles](#local-styles)
      - [General Style Rules](#general-style-rules)

## Architecture

- `@types` - Additional typescript definitions
- `src/assets` - Static assets
- `src/components` - Dumb components (there will likely be a handful of exceptions)
- `src/constants` - Global constants
- `src/hocs` - High Order Components
- `src/hooks` - Global hooks
- `src/locales` - A separate folder for each supported language
- `src/routes` - React Routes
- `src/ThemeProvider` - Global theme
- `src/services` - External services
- `src/state` - Global GraphQL auto generated Types
- `src/stories` - Storybook config and global stories
- `src/theme` - Global theme
- `src/types` - Global types
- `src/utils` - Reusable utilities such as date/time, colors, validators, etc
- `plop` - Plop config and templates

### Folder Structure

- Prefer folders with index files for most files.

```
src/components/Component/index.tsx
  src/components/Component/SubComponent/index.tsx

src/routes/Screen/index.tsx
  src/routes/Screen/hooks
    src/routes/Screen/hooks/index.ts
    src/routes/Screen/hooks/use-fancy-stuff/index.ts
```

A few exceptions to this rule are `assets`, `config`, `constants`, `stories`, `hooks`, `styles` and `utils`.

```
src/config/state.ts

src/constants/environments.ts

src/styles/colors.ts

```

## Design Patterns

### Functional Components

Use functional components rather than Class components.

There might be some exceptions, such as the `ErrorBoundary` component.

<br>

Basic principles:

- All function PARAMETERS should be as relaxed as possible (ie: `ReactNode` instead of `JSX.Element`).

- All function RETURN should be as narrow as possible (ie: `JSX.Element` | `null` instead of `ReactNode`).

- This is a valid rule for all functions, in every programming language. This helps to maximize the usage as you never know if the receiver of your result will be as relaxed. Suppose a 3rd party library that receives `JSX.Element` | `string` | `null`, you do return `JSX.Element` | `null`, it would work, but if you declare `ReactNode` as result, it won't as it would include many other types

### Memoization

#### useCallback

Use `useCallback` on callbacks that are passed to items as props

```js
const onPress = useCallback((): void => {
  onSelection(index);
}, [index, onSelection]);
```

#### Arrow Functions

Prefer arrow functions over regular functions.

```diff
+ const doSomething = (): void => {
+   ...
+ }

- function doSomething(): void {
-   ...
- }
```

## Assets

The assets should be added under the `src/assets/icons`.

## Conventions

### Constants

#### Local Constants

- Constants object names use `PascalCase`
- Constant keys use `camelCase`
- Never use all `SCREAMING_SNAKE_CASE` names for constant variables or keys
- Group local constants into a Constants object at the top of the file rather than creating one off variables.

```diff
- const title = 'title';
- const firstName = 'name;
- const IS_FRIEND = false
+ const Constants = {
+   title: 'title',
+   firstName: 'name',
+   isFriend: true,
+ }
```

#### Global Constants

- Prefer exporting a default object when possible
- Import default exports using `PascalCase`

```diff
+ export default {
+   dev: 'dev',
+   staging: 'staging',
+   prod: 'prod',
+ };

...

+ import Environments from 'constants/environments`;
- import environments from 'constants/environments`;
```

### Enums

- Enum variable names use `PascalCase`
- Enum keys use `PascalCase`
- Never use all `SCREAMING_SNAKE_CASE` names for enum variables or keys
- Do not prefix with `E`

```diff
- export enum environmentName {
- export enum ENVIRONMENT_NAME {
- export enum Environment_Name {
- export enum EEnvironmentName {
+ export enum EnvironmentName {
-   DEVELOP = 'Develop',
+   Develop = 'Develop',
+   Staging = 'Staging',
+   Production = 'Production',
+ }
```

### Components

- Components use `PascalCase`
- All components live in a file named `index.tsx` within a folder named for the exported component
- Sub components should follow the same structure above

```diff
+ src/components/
+   Component/
+     index.tsx
+     styles.ts
+     types.ts
+     utils.ts
+     hooks/
+       use-example-hook.ts
+     SubComponent/
+       index.tsx
+       styles.ts
-   sub-component.tsx
```

### Props

Destructure props within a component rather than referencing a `props` object.

Always use `camelCase` for prop names, or `PascalCase` if the prop is a React Component.

```diff
+ import HeaderComponent from 'components/Component/HeaderComponent'

+ <Component
+   firstName="Name"
-   FirstName="Name"
-   first_name="Name"
+   HeaderComponent={HeaderComponent}
-   headerComponent={HeaderComponent}
+ />
```

### Styles

#### Local Styles

- Always name component-specific styles file `styles.ts`
- Never import styles from other components

```diff
+ src/components/Component/styles.ts
- src/components/Component/style.ts
```

- Export styles object as `styles`
- Individual styles use `camelCase`

```diff
- export default sx({
+ export default sx({
+   itemContainer: {
+     ...
+   },
-   item-container: {
-     ...
-   },
-   item_container: {
-     ...
-   },
+ });
```

#### General Style Rules

Always look for spacing (margin, padding, etc) in the `spacing` theme. Round to the closest one available if possible. If not, check in with the designers just to be sure.

```diff
+ import theme from 'ThemeProvider';
+ import sx from 'utils/createSx';
+
+ export default sx({
+   container: {
+     margin: theme => theme.spacing(1),
-     margin: 8,
+     width: theme => theme.spacing(100)
-     width: 800,
+   },
+ });
```

If you **must** use a one-off value for dimensions, spacing, etc, store it in a `Constants` object at the top of the file with a contextual name.

```diff
+ const Constants = {
+   containerMargin: 23,
+   containerWidth: 105,
+ }
+
+ export default sx({
+   container: {
+     margin: Constants.containerMargin,
-     margin: 20,
+     width: Constants.containerWidth,
-     width: 100,
+   },
+ });
```

Only use colors and types that are defined in global theme.

```diff
+ import theme from 'ThemeProvider';
+
+ const styles = StyleSheet.create({
+   container: {
+     backgroundColor: theme.palette.common.white,
-     backgroundColor: 'white',
+   },
+ });
```

If you need to use something that is just from the custom theme, you need to import it separately.

```js
import { customTheme } from 'ThemeProvider/quickstartTheme';
export default sx({
  text: {
    fontSize: customTheme.fontSize.large,
  },
});
```
