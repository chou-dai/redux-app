import React from 'react';
import { Switch, Route } from 'react-router';
import Auth from './Auth';
import { SignUp, SignIn, Reset, MenuEdit, MenuList, MenuDetail, RestaurantEdit, RestaurantList, RestaurantDetail, ReviewEdit } from './templates';

const Router = () => {
  return(
    <Switch>
      <Route exact path="/signup" component={SignUp} />
      <Route exact path="/signin" component={SignIn} />
      <Route exact path="/signin/reset" component={Reset} />

      <Auth>
        <Route exact path={"(/)?"} component={RestaurantList} />
        <Route exact path={"/restaurant/:id"} component={RestaurantDetail} />
        <Route path={"/restaurant/edit(/:id)?"} component={RestaurantEdit} />
        
        <Route exact path={"/restaurant/:id/menu"} component={MenuList} />
        <Route exact path={"/restaurant/:id/menu/:id"} component={MenuDetail} />
        <Route path={"/restaurant/:id/menu/edit(/:id)?"} component={MenuEdit} />

        <Route path={"/restaurant/:id/menu/:id/review/edit(/:id)?"} component={ReviewEdit} />
      </Auth>
    </Switch>
  )
}

export default Router