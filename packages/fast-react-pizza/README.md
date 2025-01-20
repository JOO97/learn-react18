# fast-react-pizza

## requirements

## features + pages

- user
  - homePage
- menu
  - /menu
- cart
  - /cart
- order
  - /order/new
  - /order/:orderID

## state management

- user
  - global ui state
- menu
  - global remote state
- cart
  - global ui state
- order
  - global remote state

## technology

- Routing: react-router
- Styling: tailwindcss
- Remote state management: react-router
- UI state: redux

## 目录

- router
  - loader
    - useLoaderData
  - loading
    ```js
    const navigation = useNavigation()
    const isLoading = navigation.state === 'loading'
    ```
  - error handle
    - `errorElement: <Error />`
    - `const error = useRouteError()`
  - action
  - `useFetcher` 用router中定义的loader

## tailwindcss

### installation

```sh
# 排序
npm install -D prettier prettier-plugin-tailwindcss
```

- `@apply`

## redux
