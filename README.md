<p align="center">
  <a href="" rel="noopener">
 <img width=200px height=200px src="https://testing-library.com/img/octopus-64x64.png" alt="Project logo" /></a>
</p>

<h3 align="center">React testing librarys</h3>

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
- getByDisplayValue(): theo value thuộc tính của nó , thường dành cho <input>các phần tử
- getByTitle(): bởi title giá trị thuộc tính của nó
```
Và khi các phương thức này không đủ, bạn có thể sử dụng getByTestId() phương thức cho phép bạn tìm một phần tử theo data-testid thuộc tính của nó :

```
import { render, screen } from '@testing-library/react';

render(<div data-testid="custom-element" />);
const element = screen.getByTestId('custom-element');
```

## Giới thiệu một số loại kiểm tra <a name = "use"></a>
Chúng ta phải gọi afterEach(cleanup) để dọn dẹp sau mỗi lần thực hiện test, nếu không test này sẽ gây side-effect lên test kia.
## 1. Kiểm tra các phần tử DOM
Để kiểm tra các phần tử DOM của chúng tôi, trước tiên chúng ta phải xem file ```TestElements.js```

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
``` TestElements.test.js ```

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
it('should be enabled', () => {
    const { getByTestId } = render(<TestElements />);
    expect(getByTestId('button-up')).not.toHaveAttribute('disabled')
  });

  it('should be disabled', () => {
    const { getByTestId } = render(<TestElements />); 
    expect(getByTestId('button-down')).toBeDisabled()
  });
```
Chúng ta kiểm tra xem nội dung văn bản 
```<h1 data-testid="counter">{ counter }</h1>```
có bằng 0 hay không bằng cách sử dụng getByTestIdđể chọn các yếu tố cần thiết.
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

### Tổng kết <a name = "Tổng_Kết"></a>

## ✍️ Authors <a name = "authors"></a>




