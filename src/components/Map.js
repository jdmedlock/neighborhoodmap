import React from 'react';

// React Material Web Components
import { Button } from '@rmwc/button';
import { Drawer, DrawerHeader, DrawerContent, DrawerTitle } from '@rmwc/drawer';
import { Grid, GridCell } from '@rmwc/grid';
import { List, ListItem } from '@rmwc/list';

// Application Components
import '../css/App.css';

class Map extends React.Component {

  /**
   * @description Establish the state for this component
   * @param {*} props
   */
  constructor(props) {
    super(props);

    this.state = {
      modalOpen: false,
    };
  }

  /**
   * @description Create the map area containing the map of our neighborhood
   * @returns {HTMLDivElement} Main application page
   * @memberof Map
   */
  render() {
    return (
      <div>
        <Drawer modal open={this.state.modalOpen}
          onClose={() => this.setState({ modalOpen: false })} >
          <DrawerHeader>
            <DrawerTitle>Location Details</DrawerTitle>
          </DrawerHeader>
          <DrawerContent>
            <List>
              <ListItem>Cookies</ListItem>
              <ListItem>Pizza</ListItem>
              <ListItem>Icecream</ListItem>
            </List> 
          </DrawerContent>
        </Drawer>
        <Button raised
          onClick={() => this.setState({modalOpen: !this.state.modalOpen})} >
          Toggle Drawer
        </Button>

        <Grid>
          <GridCell span="8">
            <section id="map" />
          </GridCell>
        </Grid>
      </div>
    )
  }
}

export default Map;
