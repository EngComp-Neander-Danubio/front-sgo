import { Outlet } from 'react-router-dom'
import { Header } from './header'
import { Flex, Grid, GridItem } from '@chakra-ui/react'

export function PrivadoLayout() {
  return (
    <Flex direction="column" h="100vh">
      <Header />
      <Grid
        templateRows="repeat(1, 1fr)"
        templateColumns="repeat(5, 1fr)"
        gap={4}
        p={4}
      >
        <GridItem colSpan={1} bg="tomato" />
        <GridItem colSpan={4} bg="papayawhip">
          <Outlet />
        </GridItem>
      </Grid>
    </Flex>
  )
}
