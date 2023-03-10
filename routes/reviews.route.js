import express from 'express'
import ReviewsControler from '../controllers/reviews.controller.js'

const router = express.Router()

router.route('/new').post(ReviewsControler.postReview)
router.route('/movie/:id').get(ReviewsControler.getReviewsByMovieId)
router
  .route('/:id')
  .get(ReviewsControler.getReview)
  .patch(ReviewsControler.updateReview)
  .delete(ReviewsControler.deleteReview)
//.put(ReviewsControler.updateReview)

export default router
