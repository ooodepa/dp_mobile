interface ArticleAttachedLinks {
  dp_id: number;
  dp_name: string;
  dp_url: string;
  dp_articleId: string;
}

interface ArticleDto {
  dp_id: string;
  dp_name: string;
  dp_date: string;
  dp_urlSegment: string;
  dp_photoUrl: string;
  dp_text: string;
  dp_sortingIndex: number;
  dp_seoKeywords: string;
  dp_seoDescription: string;
  dp_isHidden: boolean;
  dp_articleAttachedLinks: ArticleAttachedLinks[];
}

export default ArticleDto;
