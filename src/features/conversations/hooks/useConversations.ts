import { useInfiniteQuery } from "@tanstack/react-query";
import { getConversations } from "../api/conversationsApi";
import { conversationsKeys } from "../api/conversationsKeys";

const PAGE_SIZE = 20;

export function useConversations() {
  return useInfiniteQuery({
    queryKey: conversationsKeys.lists(),
    queryFn: ({ pageParam }) => getConversations({ page: pageParam, size: PAGE_SIZE }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) =>
      lastPage.number + 1 < lastPage.totalPages ? lastPage.number + 1 : undefined,
  });
}
