import ReviewsDAO from '../dao/reviews.DAO.js'

export default class ReviewsControler {
  static async postReview(req, res, next) {
    try {
      const movieId = parseInt(req.body.movieId)
      const review = req.body.review
      const user = req.body.user
      console.log('post review movieId', movieId)

      if (!movieId || !review || !user) {
        res.status(400).json({
          status: 'error',
          message: 'missing some required data: movieId || review || user',
        })
        return
      }

      const reviewPostResponse = await ReviewsDAO.postReview(movieId, review, user)
      console.log('reviewPostResponse', reviewPostResponse)

      res.json({
        status: 'success',
        message: 'review post - success',
        reviewPostResponse,
      })
    } catch (error) {
      console.log('Api postReview error', error)
      res.status(500).json({
        error,
        status: 'error',
        message: 'Api postReview error',
      })
    }
  }

  static async deleteReview(req, res, next) {
    try {
      const reviewId = req.params.id
      console.log('controller reviewId', reviewId)

      const reviewDeleteResponse = await ReviewsDAO.deleteReview(reviewId)

      let { error } = reviewDeleteResponse
      if (error) {
        res.status(400).json({ error, status: 'error', message: 'delete review error' })
      }

      res.json({
        status: 'success',
        message: 'review delete - success',
        reviewDeleteResponse,
      })
    } catch (error) {
      console.log('Api deleteReview error', error)
      res.status(500).json({
        error,
        status: 'error',
        message: 'Api deleteReview error',
      })
    }
  }

  static async updateReview(req, res, next) {
    try {
      const reviewId = req.params.id
      const review = req.body.review
      const user = req.body.user

      if (!reviewId || !review || !user) {
        res.status(400).json({
          status: 'error',
          message: 'missing some required data: movieId || review || user',
        })
        return
      }

      const updateReviewResponse = await ReviewsDAO.updateReview(reviewId, review, user)

      let { error } = updateReviewResponse
      if (error) {
        res.status(400).json({ error, message: 'update review error' })
      }
      // if (updateReviewResponse.modifiedCount === 0) {
      //   throw new Error('Unable to update review')
      // }

      res.json({
        status: 'success',
        message: 'Review update - success',
        updateReviewResponse,
      })
    } catch (error) {
      console.log('Api updateReview error')
      res.status(500).json({
        error,
        status: 'error',
        message: 'Api updateReview error',
      })
    }
  }

  static async getReview(req, res, next) {
    try {
      let id = req.params.id || {}
      let review = await ReviewsDAO.getReview(id)

      if (!review) {
        res.status(404).json({ error: 'getReviews - reviews not found' })
        return
      }

      res.json(review)
    } catch (error) {
      console.log('Api getReviews error', error)
      res.status(500).json({
        error,
        status: 'error',
        message: 'Api getReviews error',
      })
    }
  }

  static async getReviewsByMovieId(req, res, next) {
    try {
      let id = req.params.id || {}
      let reviews = await ReviewsDAO.getReviewsByMovieId(id)

      if (!reviews) {
        res.status(404).json({ error: 'getReviewsByMovieId - reviews not found' })
        return
      }

      res.json(reviews)
    } catch (error) {
      console.log('Api getReviewByMovieId error', error)
      res.status(500).json({
        error,
        status: 'error',
        message: 'Api getReviewByMovieId error',
      })
    }
  }
}
