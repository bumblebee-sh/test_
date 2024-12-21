<script setup lang="ts">
import { useInfiniteScroll } from '@vueuse/core';
import { ref } from 'vue';
import { useInfiniteQuery, useQueryClient, useMutation } from '@tanstack/vue-query';

import Loader from './Loader.vue';
import PeopleService from '../services/people.service.ts';

/*
  mock person to add
*/
let newPerson: any = undefined;
PeopleService.getRandomPerson().then((person) => (newPerson = person));

const QUERY_KEY = 'people';
/*
  infinity Query
*/
const { data, fetchNextPage, isFetching, isError } = useInfiniteQuery({
  initialPageParam: 1,
  queryKey: ['people'],
  queryFn: PeopleService.getRandomPeople,
  getNextPageParam: (lastPage) => lastPage.cursor,
});

const el = ref<HTMLElement | null>(null);

const { reset } = useInfiniteScroll(
  el,
  () => {
/*
      Wait previous api call before send new one
*/
    if (!isFetching.value) {
      fetchNextPage();
    }
  },
  { distance: 5 },
);

const queryClient = useQueryClient();

const { mutate } = useMutation({
  mutationFn: (newPerson: any) => PeopleService.addNewPersonMock(newPerson),
  onMutate: async (newPerson) => {
    await queryClient.cancelQueries({ queryKey: [QUERY_KEY] });
    const previousTodos = queryClient.getQueryData([QUERY_KEY]);
    queryClient.setQueryData([QUERY_KEY], (old) => {
      const copyOld = JSON.parse(JSON.stringify(old));
      copyOld.pages[0].data.unshift(newPerson);
      return copyOld;
    });

    return { previousTodos };
  },

  /*
    Uncomment for updating list
  */
  // onSettled: async () => {
  //   return await queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
  // },
});

function onReset() {
  reset();
  queryClient.setQueryData([QUERY_KEY], (data) => {
    return {
      pageParam: [],
      pages: [],
    };
  });
  queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
}

async function onAdd() {
  mutate(newPerson);
}
</script>

<template>
  <div class="list__wrapper">
    <Loader v-if="isFetching" />
    <div ref="el" class="list" v-if="data">
      <template v-for="(page, i) in data.pages" :key="i">
        <div v-for="item in page.data" :key="item.login.uuid" class="list__item">
          {{ item.name.first }} {{ item.name.last }} | {{ item.email }}
        </div>
      </template>
    </div>
  </div>
  <div v-if="isError">Error =(</div>
  <div class="action">
    <button :disabled="isFetching" class="action__btn" type="button" @click="onReset">Reset</button>
    <button :disabled="isFetching" class="action__btn" type="button" @click="onAdd">Add new person</button>
  </div>
</template>

<style scoped>
.list__wrapper {
  position: relative;
  height: 200px;
  background: var(--vt-c-black-soft);
}

.list {
  height: 100%;
  overflow-y: scroll;
  padding: 10px;
  margin-bottom: 40px;
  position: relative;

  .list__item {
    padding: 5px 10px;
    background: var(--vt-c-indigo);
    margin-bottom: 10px;
    border-radius: 5px;
  }
}

.action {
  display: flex;
  padding: 20px 0;
  justify-content: center;

  .action__btn {
    cursor: pointer;
    margin: 0 10px;
    border: 3px solid var(--color-green-light);
    color: var(--color-green-light);
    border-radius: 5px;
    padding: 10px 15px;
    background: transparent;

    &[disabled] {
      opacity: 0.1;
    }

    &:not([disabled]):hover {
      background-color: var(--color-green-light);
      color: #fff;
    }
  }
}
</style>
