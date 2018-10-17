import React, { Component } from 'react';
import cabifyLogo from './images/cabify-logo.svg';
import './styles/App.css';

const phonePrefixes = [
  {
    country: '',
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
              fullname: '',
              jobdescription:'',
              prefix:'',
              phonenumber: '',
              email:'',
              website:'',
              address:'',
            },
      selectState: false,
    }
    this.handleSelect=this.handleSelect.bind(this);
    this.handleChangeInputs=this.handleChangeInputs.bind(this);
    this.setWrapperRef=this.setWrapperRef.bind(this);
    this.handleClickOutside=this.handleClickOutside.bind(this);
  }

  componentDidMount(){
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount(){
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  handleSelect(){
    this.setState({
      selectState: !this.state.selectState,
    })
  }

  handleChangeInputs(e){
    const value = e.currentTarget.value;
    const name = e.currentTarget.name;
    return name !== undefined
      ? this.setState({
          data: {
            ...this.state.data,
            [name]: value,
          },
        })
      : this.setState({
          data:{
            ...this.state.data,
            prefix: e.currentTarget.id
          },
          selectState: false,
      })
  }

  setWrapperRef(node){
    console.log(node);
    this.wrapperRef = node;
  }

  handleClickOutside(e){
    !this.wrapperRef.contains(e.target)
      ? this.setState({
        selectState: false,
        })
      : null;
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
              <div className="formField-input active col col12">
                <div className="input">
                  <input type="text" name="fullname" value={fullname} onChange={this.handleChangeInputs}/>
                  <label htmlFor="fullname">Full name</label>
                </div>
              </div>
            </div>
{/* you probably need to add active/focus/disabled classNames */}
            <div className="row row-separationMedium">
              <div className="formField-input active focus col col12">
                <div className="input">
                  <input type="text" name="jobdescription" value={jobdescription} onChange={this.handleChangeInputs}/>
                  <label htmlFor="jobdescription">Job description</label>
                </div>
              </div>
            </div>
{/* select field will be placed here */}
            <div className="row row-separationMedium row-gutterMedium">
              <div className="formField-select active col col3">
                <div className="select">
                  <button id="phone_prefix" className="select-button" type="button" onClick={this.handleSelect}>{prefix}</button>
                  <label htmlFor="phone_prefix">Prefix</label>
                  <div ref={this.setWrapperRef} className={`popup dropdown-fade dropdown-back ${this.state.selectState ? 'select-open' : ''}`}>
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
              <div className="formField-input active col col9">
                <div className="input">
                  <input type="tel" name="phonenumber" value={phonenumber} onChange={this.handleChangeInputs}/>
                  <label htmlFor="phonenumber">Phone number</label>
                </div>
              </div>
            </div>
            <div className="row row-separationMedium">
              <div className="formField-input col col12">
                <div className="input">
                  <input type="email" name="email" value={email} onChange={this.handleChangeInputs}/>
                  <label htmlFor="email">Email</label>
                </div>
              </div>
            </div>
            <div className="row row-separationMedium">
              <div className="formField-input active disabled col col12">
                <div className="input">
                  <input type="text" name="website" value={website} onChange={this.handleChangeInputs}/>
                  <label htmlFor="website">Website</label>
                </div>
              </div>
            </div>
            <div className="row row-separationMedium">
              <div className="formField-input active col col12">
                <div className="input">
                  <input type="text" name="address" value={address} onChange={this.handleChangeInputs}/>
                  <label htmlFor="address">Address</label>
                </div>
              </div>
            </div>
            <div className="row row-separationHuge">

    {/*Activar el botón cuando todos los datos estén rellenos*/}

              <input className="button button-full button-primary disabled" type="submit" value="Request" />
            </div>
          </form>
        </article>
      </div>
    );
  }
}

export default App;
