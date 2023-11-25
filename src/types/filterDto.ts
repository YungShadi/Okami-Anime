export interface FilterArrayElement {
  title: string;
  value: string;
  status: string;
}
export interface FilterDto {
  tagArray: FilterArrayElement[];
  typeArray: FilterArrayElement[];
  statusArray: FilterArrayElement[];
  activeTags: FilterArrayElement[] | [];
  activeTypes: FilterArrayElement[] | [];
  activeStatus: FilterArrayElement[] | [];
  excludedTags: FilterArrayElement[] | [];
  excludedTypes: FilterArrayElement[] | [];
}
