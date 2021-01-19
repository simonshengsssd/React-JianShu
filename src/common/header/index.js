import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import { actionCreators }  from './store';
import { actionCreators as loginActionCreators } from '../../pages/login/store';
import { Link } from 'react-router-dom';
import { 
  HeaderWrapper, 
  Logo, 
  Nav, 
  NavItem, 
  NavSearch,
  SearchWrapper,
  SearchInfo,
  SearchInfoTitle,
  SearchInfoSwitch,
  SearchInfoList,
  SearchInfoItem,
  Addition,
  Button,
} from './style';


class Header extends Component {

  getListArea = (show) => {
    const { focused, list, page, totalPage, mouseIn, handleMouseEnter, handleMouseLeave, handleChangePage } = this.props;
    // 这里的list是一个immutable的
    const newList = list.toJS();
    const pageList = [];

    if (newList.length) {
      for (let i = ((page - 1) * 10); i < page * 10; i++) {
        pageList.push(
          <SearchInfoItem key={newList[i]}>{newList[i]}</SearchInfoItem>
        )
      }
    }
    if (focused || mouseIn) {
      return (
        <SearchInfo 
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <SearchInfoTitle>
            Hot Search
            <SearchInfoSwitch 
              onClick={() => handleChangePage(page, totalPage, this.spinIcon)}
            >
            <span ref={(icon) => {this.spinIcon = icon}} 
              className="iconfont spin">&#xe857;
            </span>
              Refresh
            </SearchInfoSwitch>
          </SearchInfoTitle>
          <SearchInfoList>
            {pageList}
          </SearchInfoList>
        </SearchInfo>
      )
    } else {
      return null;
    }
  }
  render() {
    const { focused, handleInputFocus, handleInputBlur, list, login, logout } = this.props;
    return(
      <HeaderWrapper>
        <Link to='/'>
        {/* 超链接地址也可以在style.js里面的a标签后面加attrs进行改动 */}
        {/* <Logo href='/'/> */}
          <Logo/>
        </Link>
        <Nav>
          <NavItem className='left active'>MainPage</NavItem>
          <NavItem className='left'>Download</NavItem>
          {
            login ? 
            <NavItem onClick={logout} className='right'>LogOut</NavItem> : 
            <Link to='/login'><NavItem className='right'>Login</NavItem></Link>
          }
          <NavItem className='right'>
            <span className="iconfont">&#xe636;</span>
          </NavItem>
          <SearchWrapper>
            <CSSTransition
              in={this.props.focused} 
              timeout={200}
              classNames="slide"
            >
            <NavSearch
              className={focused ? 'focused' : ''}
              onFocus={() => handleInputFocus(list)}
              onBlur={handleInputBlur}
            ></NavSearch>
            </CSSTransition>
            <span className={focused ? 'focused iconfont zoom' : 'iconfont zoom'}>
              &#xe610;
            </span>
            {this.getListArea()}
          </SearchWrapper>
        </Nav>
        <Addition>
          <Link to='/write'>
            <Button className='writing'>
            <span className="iconfont">&#xe6e5;</span>
              Write
            </Button>
          </Link>
          <Button className='reg'>
            LogUp
          </Button>
        </Addition>
      </HeaderWrapper>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    // state是一个js对象，header是一个immutable对象
    // 因此要改header成immutable
    focused: state.getIn(['header', 'focused']),
    list: state.getIn(['header', 'list']),
    page: state.getIn(['header', 'page']),
    totalPage: state.getIn(['header', 'totalPage']),
    mouseIn: state.getIn(['header', 'mouseIn']),
    login: state.getIn(['login', 'login'])
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleInputFocus(list) {
      // 一般异步的数据处理不会直接写在组建里面
      // 并且当size等于0的时候才要获取list，否则就证明已经取到了list的内容，可以避免多次
      // 发送请求
      if (list.size === 0) {
        dispatch(actionCreators.getList());
      }
      dispatch(actionCreators.searchFocus());
    },

    handleInputBlur() {
      dispatch(actionCreators.searchBlur());
    },

    handleMouseEnter() {
      dispatch(actionCreators.mouseEnter());
    },

    handleMouseLeave() {
      dispatch(actionCreators.mouseLeave());
    },

    handleChangePage(page, totalPage, spin) {
      // console.log(spin.style.transform);
      // spin.style.transform = 'rotate(80deg)';
      let originAngle = spin.style.transform.replace(/[^0-9]/ig, '');
      if (originAngle) {
        originAngle = parseInt(originAngle, 10);
      } else {
        originAngle = 0;
      }
      spin.style.transform = 'rotate(' + (originAngle + 80) + 'deg)';
      // console.log(page, totalPage);
      if (page < totalPage) {
        dispatch(actionCreators.changePage(page + 1));
      } else {
        dispatch(actionCreators.changePage(1));
      }
    },
    logout() {
      dispatch(loginActionCreators.logout());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);