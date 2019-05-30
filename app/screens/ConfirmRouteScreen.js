import React from 'react';
import SelectScreenShell from '../components/shell/SelectScreenShell';
import OBAPicker from '../components/misc/OBAPicker';

function getOptions({ routes, navigation }) {
  const routeNum = navigation.state.params.routeNum.toLowerCase()
  return (
    routes
      .filter(route => {
        return route.get('shortName').toLowerCase() === routeNum
          || route.get('longName').toLowerCase() === routeNum
      })
      .toJS()
      .map(route => ({
        value: route.id,
        label: `${route.shortName} ${(route.description || route.longName)}`
      }))
  );
}

export default function ConfirmRouteScreen({ routes, selectRoute, navigation }) {
  return (
    <SelectScreenShell titleText={`WHICH ${navigation.state.params.routeNum} DID YOU MEAN`}>
      <OBAPicker
        accessibilityHint="pick which route you are referring to"
        options={getOptions({ routes, navigation })}
        onSelect={id => {
          selectRoute(routes.find(route => route.get('id') === id));
          navigation.navigate('DirectionSelect');
        }}
      />
    </SelectScreenShell>
  );
}