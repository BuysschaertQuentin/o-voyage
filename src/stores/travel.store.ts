import travelService from '@/services/travel/travel.service'
import { defineStore } from 'pinia'
import type { ITravel, TravelInput } from '@/models'

export const useTravelStore = defineStore('travel', {
  state: () => ({
    travels: [] as ITravel[],
    travel: null as ITravel | null
  }),
  actions: {
    async getTravels() {
      this.travels = await travelService.getTravelList()
    },
    async createTravel(travelForm: TravelInput) {
      travelForm.organizerId = this.$auth.user?.id
      try {
        const travel = await travelService.createTravel(travelForm)
        this.travels.push(travel)
        this.$alert.showAlert({
          message: 'Le voyage a bien été créé',
          type: 'success'
        })
      } catch (error) {
        this.$alert.showAlert({
          // @ts-ignore
          message: error.message,
          type: 'error'
        })
      }
    },

    async getTravelBySlug(slug: string) {
      this.travel = await travelService.getTravelBySlug(slug)
    },

    async deleteTravel(travelId: number) {
      try {
        await travelService.deleteTravel(travelId)
        this.travels = this.travels.filter((travel) => travel.id !== travelId)
        this.$alert.showAlert({
          message: 'Le voyage a bien été supprimé',
          type: 'success'
        })
      } catch (error) {
        this.$alert.showAlert({
          // @ts-ignore
          message: error.message,
          type: 'error'
        })
      }
    }
  }
})
