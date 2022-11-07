import React, { PureComponent } from 'react';

import './PythonR.style.scss';

export default class PythonR extends PureComponent {
  // constructor(props) {
  //   super(props);

  //   this.state = {
  //     inserted: false
  //   };
  // }

  componentDidMount() {    
    window.onload = () =>{
      const script = document.createElement('script');
      script.defer = true;
      script.src = 'https://pyscript.net/latest/pyscript.js';

      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://pyscript.net/latest/pyscript.css';

      document.head.append(script);
      document.head.append(link);
    };
    // document.getElementsByClassName('PythonR')[0].innerHTML = <p>test</p>
  }

  render() {
    return (
      <main className="PythonR">
        {/* <py-script> print('Hello, World!') </py-script> */}
          <py-config>
            - bokeh
            - numpy
            - paths:
              - ./utils.py
              - ./antigravity.py
          </py-config>

          <div>
            <py-box widths='2/3;1/3'>
              <py-repl id='my-repl' auto-generate='true' std-out='output' std-err='err-div'></py-repl>
              <div id='output' className='p-4'></div>
            </py-box>
          </div>
      </main>
    );
  }
}
