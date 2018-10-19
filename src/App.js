import React, { Component } from 'react';
import cabifyLogo from './images/cabify-logo.svg';
import './styles/App.css';

//Data from select

const phonePrefixes = [
  {
    country: 'Select your prefix',
    prefix: '',
  },
  {
    country: 'Spain',
    prefix: '+34',
  },
  {
    country: 'Chile',
    prefix: '+56',
  },
  {
    country: 'Peru',
    prefix: '+51',
  },
  {
    country: 'Mexico',
    prefix: '+521',
  },
  {
    country: 'Colombia',
    prefix: '+57',
  },
  {
    country: 'Bolivia',
    prefix: '+561',
  },
]

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      data: {
        fullname: 'a',
        jobdescription:'a',
        prefix:'a',
        phonenumber: 'a',
        email:'a',
        website:'www.cabify.com',
        address:'a',
      },
      active: {
        fullname: false,
        jobdescription: false,
        prefix: false,
        phonenumber: false,
        email: false,
        website: true,
        address: false,
      },
      focus: {
        fullname: false,
        jobdescription: false,
        prefix: false,
        phonenumber: false,
        email: false,
        website: false,
        address: false,
      },
      activeSelect: false,
      submitButton: false,
      errorMail: false,
    }
    this.handleSelect=this.handleSelect.bind(this);
    this.handleChangeInputs=this.handleChangeInputs.bind(this);
    this.setWrapperRef=this.setWrapperRef.bind(this);
    this.handleClickOutside=this.handleClickOutside.bind(this);
    this.handleActiveFocus=this.handleActiveFocus.bind(this);
    this.handleBlur=this.handleBlur.bind(this);
    this.handleSubmitButton=this.handleSubmitButton.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this);
  }

  componentDidMount(){
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount(){
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  // Functions to control input styles

  // Input styles (active, focused)

  handleActiveFocus(e){
    const name = e.target.name;
    this.setState({
      active: {
        ...this.state.active,
        [name]: true,
      },
      focus: {
        ...this.state.focus,
        [name]: true,
      },
    })
  }

  // Select styles (opened, active, focus)

  handleSelect(){
    this.setState({
      activeSelect: true,
      active: {
        ...this.state.active,
        prefix: true,
      },
      focus: {
        ...this.state.focus,
        prefix: true,
      }
    })
  }

  // Function to save input data in state. 
  // Function to control select styles when an option is selected.

  handleChangeInputs(e){
    const value = e.target.value;
    const name = e.target.name;
    const id = e.target.id;
    return name !== undefined
      ? this.setState({
          data: {
            ...this.state.data,
            [name]: value,
          },
        },() => {this.handleSubmitButton()}
        )
      : this.setState({
        data: {
          ...this.state.data,
          prefix: id,
        }, 
        activeSelect: !this.state.activeSelect,
        active: {
          ...this.state.active,
          prefix: true,
        },
        focus: {
          ...this.state.focus,
          prefix: true,
        },
      }, () => {this.handleSubmitButton()}
      )
  }

  //Input styles (unactive, unfocused)

  handleBlur(e){
    const name = e.target.name;
    const value = e.target.value;
    return !value
      ? this.setState({
          active: {
            ...this.state.active,
            [name]: false,
          },
          focus: {
            ...this.state.focus,
            [name]: false,
          },
        })
      : this.setState({
        active: {
          ...this.state.active,
          [name]: true,
        },
        focus: {
          ...this.state.focus,
          [name]: false,
        },
        })
  }

  // Select styles when click outside select.
  
  setWrapperRef(node){
    this.wrapperRef = node;
  }

  handleClickOutside(e){
    !this.wrapperRef.contains(e.target)
    ? this.state.data.prefix !== ''
      ? this.setState({
          activeSelect: false,
          active: {
            ...this.state.active,
            prefix: true,
          },
          focus: {
            ...this.state.focus,
            prefix: false,
          },
          })
      : this.setState({
        activeSelect: false,
        active: {
          ...this.state.active,
          prefix: false,
        },
        focus: {
          ...this.state.focus,
          prefix: false,
        },
        })
    : null;
  }

  //Submit functions

  //Activate button when all inputs are filled.
  
  handleSubmitButton(){
    const {
      fullname,
      jobdescription,
      prefix,
      phonenumber,
      email,
      website,
      address,
    } = this.state.data;
    fullname && jobdescription && prefix && phonenumber && email && website && address
    ? this.setState({
      submitButton: true,
    })
    : this.setState({
      submitButton: false,
    })
  }

  //Test that email has the proper format

  handleSubmit(){
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.state.data.email)){
      this.setState({
        errorMail: true, 
      })
    } else {
      this.setState({
        errorMail: false, 
      })
    }
  }

  

  

  

  render() {
    const {
      fullname,
      jobdescription,
      prefix,
      phonenumber,
      email,
      website,
      address,
    } = this.state.data;

    return (
      <div className="mainWrapper row">
        <article className="businessCard col col6">
          <figure className="businessCard-badge">
            <a className="businessCard-badge-logo" href="http://www.cabify.com">
              <img src={cabifyLogo} alt="Cabify" />
            </a>
          </figure>
          <h1 className="title-main">Request your business card</h1>
          <div className="businessCard-cards">
            <div className="businessCard-cardBack" />

{/*Tarjeta: aquí hay que meter los datos desde el estado*/}

            <div className="businessCard-cardFront">
              <div>
                <p className="businessCard-cardFront-title">{fullname}</p>
                <p className="businessCard-cardFront-subtitle">{jobdescription}</p>
              </div>
              <div className="businessCard-cardFront-bottom">
                <p className="businessCard-icon-phone">{prefix} {phonenumber}</p>
                <p className="businessCard-icon-email">{email}</p>
                <p className="businessCard-icon-website">{website}</p>
                <p className="businessCard-icon-address">{address}</p>
              </div>
            </div>
          </div>
        </article>
        <article className="builder col col6">

{/*Coger datos del formulario, poner estilos, etc.*/}

          <form className="form" action="">
            <div className="row">
              <div className={`formField-input col col12 ${this.state.active.fullname ? "active" : null} ${this.state.focus.fullname ? "focus" : null}`}>
                <div className="input">
                  <input type="text" name="fullname" value={fullname} onChange={this.handleChangeInputs} onFocus={this.handleActiveFocus} onBlur={this.handleBlur}/>
                  <label htmlFor="fullname">Full name</label>
                </div>
              </div>
            </div>
{/* you probably need to add active/focus/disabled classNames */}
            <div className="row row-separationMedium">
              <div className={`formField-input col col12 ${this.state.active.jobdescription ? "active" : null} ${this.state.focus.jobdescription ? "focus" : null}`}>
                <div className="input">
                  <input type="text" name="jobdescription" value={jobdescription} onChange={this.handleChangeInputs} onFocus={this.handleActiveFocus} onBlur={this.handleBlur}/>
                  <label htmlFor="jobdescription">Job description</label>
                </div>
              </div>
            </div>
{/* select field will be placed here */}
            <div className="row row-separationMedium row-gutterMedium">
              <div className={`formField-select col col3 ${this.state.active.prefix ? 'active' : null} ${this.state.focus.prefix ? 'focus' : null}`}>
                <div className="select">
                  <button id="phone_prefix" className="select-button" type="button" onClick={this.handleSelect}>{prefix}</button>
                  <label htmlFor="phone_prefix">Prefix</label>
                  <div ref={this.setWrapperRef} className={`popup dropdown-fade dropdown-back ${this.state.activeSelect ? 'select-open' : ''}`}>
                    <ul className="select-group-list">
                    {phonePrefixes.map(option => {
                      return(
                        <li key={option.prefix} className="select-option" id={option.prefix} onClick={this.handleChangeInputs}>
                          {/*} <span className="select-option-flag">Banderita</span>*/}
                          <span className="select-option-country">{option.country}</span>
                          <span className="select-option-prefix">{option.prefix}</span>
                        </li>
                      )
                    })}
                    </ul> 
                    {/*<div className="bottom-fade"></div>*/}  
                  </div>
                </div>
              </div>
{/* select final*/}
              <div className={`formField-input col col9 ${this.state.active.phonenumber ? "active" : null} ${this.state.focus.phonenumber ? "focus" : null}`}>
                <div className="input">
                  <input type="tel" name="phonenumber" value={phonenumber} onChange={this.handleChangeInputs} onFocus={this.handleActiveFocus} onBlur={this.handleBlur}/>
                  <label htmlFor="phonenumber">Phone number</label>
                </div>
              </div>
            </div>
            <div className="row row-separationMedium">
              <div className={`formField-input ${this.state.errorMail ? 'email-error': null} col col12 ${this.state.active.email ? "active" : null} ${this.state.focus.email ? "focus" : null} ${this.state.errorMail ? "error" : null}`}>
                <div className="input">
                  <input type="email" name="email" value={email} onChange={this.handleChangeInputs} onFocus={this.handleActiveFocus} onBlur={this.handleBlur}/>
                  <label htmlFor="email">Email</label>
                </div>
              </div>
            </div>
            <div className="row row-separationMedium">
              <div className="formField-input active disabled col col12">
                <div className="input">
                  <input type="text" name="website" value={website} disabled/>
                  <label htmlFor="website">Website</label>
                </div>
              </div>
            </div>
            <div className="row row-separationMedium">
              <div className={`formField-input col col12 ${this.state.active.address ? "active" : null} ${this.state.focus.address ? "focus" : null}`} >
                <div className="input">
                  <input type="text" name="address" value={address} onChange={this.handleChangeInputs} onFocus={this.handleActiveFocus} onBlur={this.handleBlur}/>
                  <label htmlFor="address">Address</label>
                </div>
              </div>
            </div>
            <div className="row row-separationHuge">

    {/*Activar el botón cuando todos los datos estén rellenos*/}

              <input className={`button button-full button-primary ${!this.state.submitButton ? 'disabled': null}`} type="submit" value="Request" onClick={this.handleSubmit}/>
            </div>
          </form>
        </article>
      </div>
    );
  }
}

export default App;
