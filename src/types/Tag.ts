export interface Tag {
  tag_id: string;
  name: string;
}

export interface EventTag {
  event_id: string;
  tag_id: string;
}

export interface TagWithCount extends Tag {
  event_count: number;
}