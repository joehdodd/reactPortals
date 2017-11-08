import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import './App.css';

const modalRoot = document.getElementById('modal-root');

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showPortal: false
    }
  }

  showPortal = () => {
    this.setState({ showPortal: true })
  }

  hidePortal = (e) => {
    let modalCont = e.target.classList.value === 'modal-cont';
    if (!modalCont) { this.setState({ showPortal: false }) }
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          Portals are cool.
        </p>
        <button onClick={this.showPortal}>Modal</button>
        { this.state.showPortal &&
          <Portal>
            <Modal hidePortal={this.hidePortal}/>
          </Portal>
        }
      </div>
    );
  }
}


class Portal extends Component {
  constructor(props) {
    super(props)
    this.el = document.createElement('div');
  }

  componentDidMount() {
    modalRoot.appendChild(this.el)
  }

  componentWillUnmount() {
    modalRoot.removeChild(this.el)
  }

  render() {
    return ReactDOM.createPortal(
      this.props.children,
      this.el
    )
  }
}

const Modal = (props) => {
  return (
    <div className="modal" onClick={ (e) => { props.hidePortal(e) }}>
      <div className="modal-cont">
        <h2>Modal Title is Awesome</h2>
        <p>This is the text of my modal, so yeah.</p>
        <button onClick={props.hidePortal}>Close</button>
      </div>
    </div>
  )
}

export default App;
