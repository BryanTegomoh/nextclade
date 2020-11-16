import styled from 'styled-components'

import {
  Tab as TabBase,
  TabList as TabListBase,
  TabPanel as TabPanelBase,
  Tabs as TabsBase,
} from 'src/components/Common/Tabs'

export const Tabs = styled(TabsBase)`
  border-image: none;
  border-radius: 3px;
  margin: 10px 5px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.4);
`

export const TabList = styled(TabListBase)<{ collapsible?: boolean }>`
  border: none;
  border-image: none;
  border-image-width: 0;
  height: 42px;
  background-color: #666;
  color: #ddd;
  font-size: 1.25rem;
  padding: 3px;
  padding-bottom: 0;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  margin-bottom: 0;
  display: flex;
  ${({ collapsible }) => (collapsible === undefined || collapsible) && 'cursor: pointer'};
  user-select: none;
`

export const Tab = styled(TabBase)`
  background: #666;
  color: #ccc;
  border-color: #999;
  font-size: 0.9rem;
  width: 125px;

  margin: 1px 1px;
  padding: 8px;

  &.react-tabs__tab--selected {
    border: none;
    border-image: none;
    font-weight: bold;
  }

  :hover {
    background: #777;
    color: #eee;
  }

  &.react-tabs__tab--selected:hover {
    background: #fff;
    color: #333;
    font-weight: bold;
  }
`

export const TabPanel = styled(TabPanelBase)`
  border: none;
  border-image: none;
  border-image-width: 0;
  margin: 3px 2px;
  padding: 6px;
  height: 200px;
`

export const TextContainer = styled.span`
  display: flex;
  flex: 1;
  position: relative;
  padding: 4px 7px;
  font-weight: bold;
  font-size: 1.25rem;
`
