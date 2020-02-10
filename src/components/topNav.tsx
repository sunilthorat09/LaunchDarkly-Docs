/** @jsx jsx */
import { jsx, useThemeUI, Link as ThemUILink } from 'theme-ui'
import { graphql, useStaticQuery, Link as GatsbyLink } from 'gatsby'
import { SideNavItem } from './sideNav/types'
import isExternalLink from '../utils/isExternalLink'
import Icon, { IconName } from './icon'

const variant = 'links.topNav'

const TopNav = () => {
  const { theme } = useThemeUI()
  const {
    allNavigationDataJson: { nodes: navigationData },
  } = useStaticQuery(graphql`
    query {
      allNavigationDataJson {
        nodes {
          label
          path
          svg
        }
      }
    }
  `)

  return (
    <ul
      sx={{
        fontSize: [null, 3],
        fontWeight: 'bold',
        display: ['none', 'flex'],
        justifyContent: 'space-between',
        width: [null, 'auto', 'auto'],
        whiteSpace: 'nowrap',
      }}
    >
      {navigationData.map((rootItem: SideNavItem) => {
        const { label, path, svg } = rootItem
        const capitalizedLabel = label.toUpperCase()
        return (
          <li key={label} sx={{ display: 'inline', pr: [null, 5, 6] }}>
            {isExternalLink(path) ? (
              <ThemUILink
                href={path}
                variant={variant}
                sx={{ display: 'flex' }}
                target="_blank"
                rel="noopener noreferrer"
              >
                {capitalizedLabel}
                {svg && <Icon name={svg as IconName} height="1rem" fill="grayMed" ml={1} />}
              </ThemUILink>
            ) : (
              <GatsbyLink
                to={path}
                sx={{ variant }}
                partiallyActive={true}
                activeStyle={{ color: theme.colors.primaryBase }}
              >
                {capitalizedLabel}
              </GatsbyLink>
            )}
          </li>
        )
      })}
    </ul>
  )
}

export default TopNav
