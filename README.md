<p align="center">
  <a href="" rel="noopener">
 <img width=200px height=200px src="https://testing-library.com/img/octopus-64x64.png" alt="Project logo" /></a>
</p>

<h3 align="center">React testing library</h3>

---

<p align="center"> Hướng dẫn sử dụng React Testing Library cơ bản
    <br> 
</p>

## 📝 Table of Contents

- [React Testing Library là gì?](#about)
- [Cài đặt](#install)
- [Một số phương thức](#method)
- [Giới thiệu một số loại kiểm tra](#type)


## React testing library là gì? <a name = "about"></a>

React testing library là một công cụ tiện ích thử nghiệm được xây dựng để kiểm tra DOM được React hiển thị trên trình duyệt. Mục tiêu của thư viện là giúp bạn viết các bài kiểm tra giống như cách người dùng sẽ sử dụng ứng dụng của bạn. Đồng thời việc test đảm bảo cho việc bảo trì sau này, các nhà tái cấu trúc các thành phần của bạn sẽ không phá vỡ các logic đã được thiết lập

## Cài đặt? <a name = "install"></a>
```npm install --save-dev @testing-library/react @testing-library/jest-dom```

*Hoặc cài đặt qua yarn:

```yarn add --dev @testing-library/react @testing-library/jest-dom```

Bạn cần cài đặt thêm Jest vì React testing library chỉ cung cấp các phương pháp giúp bạn viết các kịch bản thử nghiệm. Vì vậy, bạn vẫn cần một khung kiểm tra JavaScript để chạy mã thử nghiệm.

## Một số phương thức <a name = "method"></a>

React testing library cung cấp cho bạn một số phương thức để tìm một phần tử theo các thuộc tính cụ thể: 
```
- getByText(): tìm phần tử theo giá trị textContent của nó
- getByRole(): bởi role giá trị thuộc tính của nó
- getByLabelText(): bởi label giá trị thuộc tính của nó
- getByPlaceholderText(): bởi placeholder giá trị thuộc tính của nó
- getByAltText(): bởi alt giá trị thuộc tính của nó
- getByDisplayValue(): theo value thuộc tính của nó , thường dành cho các phần tử <input>
- getByTitle(): bởi title giá trị thuộc tính của nó
```
Và khi các phương thức này không đủ, bạn có thể sử dụng getByTestId() phương thức cho phép bạn tìm một phần tử theo data-testid thuộc tính của nó :

```
import { render, screen } from '@testing-library/react';

render(<div data-testid="custom-element" />);
const element = screen.getByTestId('custom-element');
```

## Giới thiệu một số loại kiểm tra <a name = "use"></a>

Để tạo 1 kịch bản test trước hết chúng ta cần import 2 phương thức ```render``` và ```cleanup```

```render``` giúp hiển thị react component và ```cleanup``` để dọn dẹp sau mỗi lần thực hiện test, nếu không test này sẽ gây side-effect lên test kia.

## 1. Kiểm tra các phần tử DOM
Để kiểm tra các phần tử DOM, trước tiên chúng ta xem file ```TestElements.js```

```
import React from 'react'

const TestElements = () => {
 const [counter, setCounter] = React.useState(0)
  
 return (
  <>
    <h1 data-testid="counter">{ counter }</h1>
    <button data-testid="button-up" onClick={() => setCounter(counter + 1)}> Up</button>
    <button disabled data-testid="button-down" onClick={() => setCounter(counter - 1)}>Down</button>
 </>
    )
  }
  
export default TestElements
```
Kiểm tra nếu bộ đếm bằng 0:

```TestElements.test.js ```

```
import React from 'react';
import { render, cleanup } from '@testing-library/react';
import TestElements from './TestElements'
import '@testing-library/jest-dom/extend-expect';

afterEach(cleanup);

it('should equal to 0', () => {
    const { getByTestId } = render(<TestElements />); 
    expect(getByTestId('counter')).toHaveTextContent(0)
});
```
Chúng ta kiểm tra xem nội dung văn bản

```<h1 data-testid="counter">{ counter }</h1>```

có bằng 0 hay không bằng cách sử dụng getByTestId để chọn các yếu tố cần thiết.

Kiểm tra xem các nút được bật hay tắt bằng cách thêm đoạn mã sau vào tệp:
```
  it('should be enabled', () => {
    const { getByTestId } = render(<TestElements />);
    expect(getByTestId('button-up')).not.toHaveAttribute('disabled')
  });

  it('should be disabled', () => {
    const { getByTestId } = render(<TestElements />); 
    expect(getByTestId('button-down')).toBeDisabled()
  });
```
Ở đây, như thường lệ, chúng ta sử dụng getByTestId để chọn các phần tử và đoạn kiểm tra đầu tiên check nút có thuộc tính disabled hay không và đoạn kiểm tra thứ hai kiểm tra nút bị vô hiệu hóa hay không.

## Để chạy trên máy của mình bạn gõ lệnh ``` yarn test ```

## 2. Kiểm tra sự kiện

Chúng ta tiến hành kiểm tra cho file ```TestEvents.js```
```
import React from 'react'

const TestEvents = () => {
  const [counter, setCounter] = React.useState(0)
  
return (
  <>
    <h1 data-testid="counter">{ counter }</h1>
    <button data-testid="button-up" onClick={() => setCounter(counter + 1)}> Up</button>
    <button data-testid="button-down" onClick={() => setCounter(counter - 1)}>Down</button>
 </>
    )
  }
  
  export default TestEvents
```

Kiểm tra xem bộ đếm tăng và giảm chính xác khi chúng ta nhấp vào các nút:

```import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import TestEvents from './TestEvents'

  afterEach(cleanup);
  
  it('increments counter', () => {
    const { getByTestId } = render(<TestEvents />); 
    
    fireEvent.click(getByTestId('button-up'))

    expect(getByTestId('counter')).toHaveTextContent('1')
  });

  it('decrements counter', () => {
    const { getByTestId } = render(<TestEvents />); 
    
    fireEvent.click(getByTestId('button-down'))

    expect(getByTestId('counter')).toHaveTextContent('-1')
  });
```
Kiểm tra đầu tiên kích hoạt sự kiện nhấp chuột fireEvent.click() để kiểm tra xem bộ đếm có tăng lên 1 khi nút được nhấp hay không.
Và cái thứ hai kiểm tra xem bộ đếm có giảm xuống -1 khi nút được nhấp hay không.

## 3. Kiểm tra các hành động không đồng bộ

Bây giờ, hãy kiểm tra tệp TestAsync.js.
```
import React from 'react'

const TestAsync = () => {
  const [counter, setCounter] = React.useState(0)

  const delayCount = () => (
    setTimeout(() => {
      setCounter(counter + 1)
    }, 500)
  )
  
return (
  <>
    <h1 data-testid="counter">{ counter }</h1>
    <button data-testid="button-up" onClick={delayCount}> Up</button>
    <button data-testid="button-down" onClick={() => setCounter(counter - 1)}>Down</button>
 </>
    )
  }
  
  export default TestAsync
```
Ở đây, chúng ta sử dụng setTimeout()để trì hoãn sự kiện tăng dần 0,5 giây.

Kiểm tra xem bộ đếm có tăng lên sau 0,5 giây hay không:

```TestAsync.test.js```
```
import React from 'react';
import { render, cleanup, fireEvent, waitForElement } from '@testing-library/react';
import TestAsync from './TestAsync'

afterEach(cleanup);
  
  it('increments counter after 0.5s', async () => {
    const { getByTestId, getByText } = render(<TestAsync />); 

    fireEvent.click(getByTestId('button-up'))

    const counter = await waitForElement(() => getByText('1')) 

    expect(counter).toHaveTextContent('1')
  });
```
Để kiểm tra sự kiện tăng dần, trước tiên chúng ta phải sử dụng async / await
Tiếp theo, chúng ta sử dụng một phương pháp getByText(). Điều này tương tự như getByTestId(), ngoại trừ việc getByText() chọn nội dung văn bản thay vì id hoặc dữ liệu-chứng thực.
Bây giờ, sau khi nhấp vào nút, chúng ta chờ bộ đếm được tăng dần với waitForElement(() => getByText('1')). Và khi bộ đếm tăng lên 1, bây giờ chúng ta có thể chuyển sang điều kiện và kiểm tra xem bộ đếm có hiệu quả bằng 1 hay không.

## 4. Kiểm tra React Redux
Chúng ta kiểm tra file ```TestRedux.js```

```
import React from 'react'
import { connect } from 'react-redux'

const TestRedux = ({counter, dispatch}) => {

 const increment = () => dispatch({ type: 'INCREMENT' })
 const decrement = () => dispatch({ type: 'DECREMENT' })
  
 return (
  <>
    <h1 data-testid="counter">{ counter }</h1>
    <button data-testid="button-up" onClick={increment}>Up</button>
    <button data-testid="button-down" onClick={decrement}>Down</button>
 </>
    )
  }
  
export default connect(state => ({ counter: state.count }))(TestRedux)
```
Và file reducer:
```store/reducer.js```
```
export const initialState = {
    count: 0,
  }
  
  export function reducer(state = initialState, action) {
    switch (action.type) {
      case 'INCREMENT':
        return {
          count: state.count + 1,
        }
      case 'DECREMENT':
        return {
          count: state.count - 1,
        }
      default:
        return state
    }
  }
```
Ta thực hiện viết unit tests.
* Kiểm tra nếu trạng thái ban đầu bằng 0:

```TestRedux.test.js```

```
import React from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { render, cleanup, fireEvent } from '@testing-library/react';
import { initialState, reducer } from '../store/reducer'
import TestRedux from './TestRedux'

const renderWithRedux = (
  component,
  { initialState, store = createStore(reducer, initialState) } = {}
) => {
  return {
    ...render(<Provider store={store}>{component}</Provider>),
    store,
  }
}

 afterEach(cleanup);

it('checks initial state is equal to 0', () => {
    const { getByTestId } = renderWithRedux(<TestRedux />)
    expect(getByTestId('counter')).toHaveTextContent('0')
  })
```

Tại đây ta sử dụng renderWithRedux(), nó nhận vào component để render, giá trị khởi tạo của state, và store. Nếu không có store nó sẽ tạo mới một store, và nếu không nhận một giá trị state khởi tạo hoặc một store nó sẽ trả về một object rỗng.

Tiếp theo chúng ta sử dụng ```render()``` để render component và truyền store vào Provider.

Bây giờ chúng ta có thể chuyển thành phần ```TestRedux``` vào ```renderWithRedux()``` để kiểm tra xem bộ đếm có bằng 0 hay không.

* Kiểm tra bộ đếm tăng giảm có chính xác không:

```TestRedux.test.js```

```
it('increments the counter through redux', () => {
  const { getByTestId } = renderWithRedux(<TestRedux />, 
    {initialState: {count: 5}
})
  fireEvent.click(getByTestId('button-up'))
  expect(getByTestId('counter')).toHaveTextContent('6')
})

it('decrements the counter through redux', () => {
  const { getByTestId} = renderWithRedux(<TestRedux />, {
    initialState: { count: 100 },
  })
  fireEvent.click(getByTestId('button-down'))
  expect(getByTestId('counter')).toHaveTextContent('99')
})
```

Để test sự kiện tăng giảm chúng ta truyền một giá trị khởi tạo state đến ```renderWithRedux()```

## 5. Kiểm tra React Context
Chúng ta kiểm tra file ```TextContext.js```
```
import React from "react"

export const CounterContext = React.createContext()

const CounterProvider = () => {
  const [counter, setCounter] = React.useState(0)
  const increment = () => setCounter(counter + 1)
  const decrement = () => setCounter(counter - 1)

  return (
    <CounterContext.Provider value={{ counter, increment, decrement }}>
      <Counter />
    </CounterContext.Provider>
  )
}

export const Counter = () => {  
    const { counter, increment, decrement } = React.useContext(CounterContext)   
    return (
     <>
       <h1 data-testid="counter">{ counter }</h1>
       <button data-testid="button-up" onClick={increment}> Up</button>
       <button data-testid="button-down" onClick={decrement}>Down</button>
    </>
       )
}

export default CounterProvider
```

* Chúng ta thực hiện kiểm tra trạng thái ban đầu bằng 0 hay không:

```
import React from 'react'
import { render, cleanup,  fireEvent } from '@testing-library/react'
import CounterProvider, { CounterContext, Counter } from './TestContext'

const renderWithContext = (
  component) => {
  return {
    ...render(
        <CounterProvider value={CounterContext}>
            {component}
        </CounterProvider>)
  }
}

afterEach(cleanup);

it('checks if initial state is equal to 0', () => {
    const { getByTestId } = renderWithContext(<Counter />)
    expect(getByTestId('counter')).toHaveTextContent('0')
})
```

Chúng ta sử dụng hàm ```renderWithContext()``` để render component.
Tại đây nó nhận component như một tham số. Và để tạo mới một context chúng ta truyền ```CounterContext``` vào Provider.
Bây giờ, chúng ta có thể kiểm tra xem ban đầu bộ đếm có bằng 0 hay không.

* Kiểm tra xem bộ đếm tăng và giảm một cách chính xác hay không:

```TextContext.test.js```
```
  it('increments the counter', () => {
    const { getByTestId } = renderWithContext(<Counter />)

    fireEvent.click(getByTestId('button-up'))
    expect(getByTestId('counter')).toHaveTextContent('1')
  })

  it('decrements the counter', () => {
    const { getByTestId} = renderWithContext(<Counter />)

    fireEvent.click(getByTestId('button-down'))
    expect(getByTestId('counter')).toHaveTextContent('-1')
  })
```

Ở đây chúng ta đã sử dụng sự kiện click chuột để kiểm tra bộ đếm có tăng chính xác thêm 1 và giảm -1

### Tổng kết <a name = "Tổng_Kết"></a>

React testing Library là một thư viện hữu ích trong việc thử nghiệm Ứng dụng React. Nó cung cấp cho chúng ta quyền truy cập vào các trình đối sánh jest-dom mà chúng ta có thể sử dụng để kiểm tra các thành phần của mình hiệu quả hơn

## ✍️ Authors <a name = "authors"></a>





