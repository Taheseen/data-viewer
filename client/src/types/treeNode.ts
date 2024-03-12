export interface ITreeNode {
  name: string
  description: string
  parent: string
  children?: ITreeNode[]
}
