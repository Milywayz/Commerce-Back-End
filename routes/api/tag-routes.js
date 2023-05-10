const router = require('express').Router();
const { Tag, Product } = require('../../models');

//! The `/api/tags` endpoint

// Find all tags for Tag
router.get('/', async (req, res) => {
  try {
    const tagData = await Tag.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});


// Finds a single tag by its `id`
router.get('/:id', async (req, res) => {
 
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }]
    });

    if (!tagData) {
      res.status(404).json({ message: 'No tag name was found with that id!' });
      return;
    }

    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Creates a new tag
router.post('/', async (req, res) => {
  try {
    const creatingTag = await Tag.create({
      tag_name: req.body.tag_name,
    });
    res.status(200).json(creatingTag);
  } catch (err) {
    res.status(400).json(err);
  }
});


// Updates a tag's name by its `id` value
router.put('/:id', async (req, res) => {
  try {
    const tagUpdated = await Tag.update(
      {
        tag_name: req.body.tag_name
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    
    res.json(tagUpdated);
  } catch (err) {
    res.json(err);
  }
});


// Delete on tag by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!tagData) {
      res.status(404).json({ message: 'No tag name was found with that id!' });
      return;
    }

    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
