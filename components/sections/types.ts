export type MultilinkStoryblok =
    | {
          fieldtype: 'multilink'
          id: string
          url: string
          cached_url: string
          target?: '_blank' | '_self'
          anchor?: string
          rel?: string
          title?: string
          prep?: string
          linktype: 'story'
          story?: {
              name: string
              created_at?: string
              published_at?: string
              id: number
              uuid: string
              content?: {
                  [k: string]: any
              }
              slug: string
              full_slug: string
              sort_by_date?: null | string
              position?: number
              tag_list?: string[]
              is_startpage?: boolean
              parent_id?: null | number
              meta_data?: null | {
                  [k: string]: any
              }
              group_id?: string
              first_published_at?: string
              release_id?: null | number
              lang?: string
              path?: null | string
              alternates?: any[]
              default_full_slug?: null | string
              translated_slugs?: null | any[]
              [k: string]: any
          }
          [k: string]: any
      }
    | {
          fieldtype: 'multilink'
          id: string
          url: string
          cached_url: string
          target?: '_blank' | '_self'
          linktype: 'url'
          rel?: string
          title?: string
          [k: string]: any
      }
    | {
          fieldtype: 'multilink'
          id: string
          url: string
          cached_url: string
          target?: '_blank' | '_self'
          email?: string
          linktype: 'email'
          [k: string]: any
      }
    | {
          fieldtype: 'multilink'
          id: string
          url: string
          cached_url: string
          target?: '_blank' | '_self'
          linktype: 'asset'
          [k: string]: any
      }

export interface NavLink {
    Name: string
    link: Exclude<
        MultilinkStoryblok,
        { linktype?: 'email' } | { linktype?: 'asset' }
    >
    open_in_new_tab?: boolean
    component: 'NavLink'
    _uid: string
    [k: string]: any
}

export interface Richtext {
    type: string
    content?: Richtext[]
    marks?: Richtext[]
    attrs?: any
    text?: string
    [k: string]: any
}

export interface Asset {
    alt: string | null
    copyright?: string | null
    fieldtype: 'asset'
    id: number
    filename: string | null
    name: string
    title: string | null
    focus: string | null
    meta_data?: {
        [k: string]: any
    }
    source?: string | null
    is_external_url?: boolean
    is_private?: boolean
    src?: string
    updated_at?: string
    width?: number | null
    height?: number | null
    aspect_ratio?: number | null
    public_id?: string | null
    content_type?: string
    [k: string]: any
}
