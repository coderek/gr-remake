require 'sinatra'
require 'tinyatom'

feed = TinyAtom::Feed.new(
  'http://mysite.com/blog/',
  'My Blog',
  'http://localhost:4567',

  # optional

  :author_name => 'me',
  :author_email => 'me@mysite.com',
  :author_uri => 'http://mysite.com/',

  :hubs => ['http://pubsubhubbub.appspot.com/']
  )

counter = 1



get '/' do

  feed.add_entry(
    counter + 1,
    'post zengqiang' + counter.to_s,
    Time.now +  3600 * counter,
    'http://mysite.com/blog/' + counter.to_s,
  :summary => 'the summary',
  :content => 'the content',

  :author_name => 'me',
  :author_email => 'me@mysite.com',
  :author_uri => 'http://mysite.com/',

  :enclosure_type => 'image/png',
  :enclosure_href => 'http://mysite.com/image.png',
  :enclosure_title => 'photo',
  :enclosure_length => 6227, # optional within enclosure

  :via_type => 'text/html',
  :via_href => 'http://anotherblog.com/posts/999',
  :via_title => 'Look at this photo',

  :media_thumbnail_url => 'http://mysite.com/thumbnails/1.jpg',
  :media_thumbnail_width => 100,
  :media_thumbnail_height => 100,
  :media_thumbnail_time => '00:00:00.000'

    )

  counter = counter + 1

  headers \
    "Content-Type" => "application/xml"

  feed.make(:indent => 2)
end
