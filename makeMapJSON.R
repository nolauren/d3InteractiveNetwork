require("igraph")
require("jsonlite")

makeMapJSON = function(gr, edgelist, names, tags, sizes, file) {
  if (!missing(gr)) {
    if (!missing(edgelist)) stop("Must supply either gr or edgelist, but not both.")
    edgelist = igraph::get.edgelist(gr) - 1
    n = igraph::vcount(g)
  } else {
    if (missing(edgelist)) stop("Must supply either gr or edgelist.")
    if (min(edgelist) != 0) warning("Node indexing should start at 0.")
    n = max(edgelist) + 1
  }

  if (missing(names)) names = rep("", n)
  if (missing(tags)) tags = as.character(1:n)
  if (missing(sizes)) sizes = rep(4, n)

  if (length(names) != n) stop("Invalid input for sizes")
  if (length(tags) != n) stop("Invalid input for tags")
  if (length(sizes) != n) stop("Invalid input for sizes")
  if (ncol(edgelist) != 2L) stop("Matrix edgelist must have exactly two columns")

  mat = cbind((1:n) - 1L, names, tags, sizes)
  nodes = apply(mat, 1, function(v) list(group=v[1], name=v[2], nodeSize=as.numeric(v[4]), meta=v[3]))
  links = apply(edgelist, 1, function(v) list(source=v[1], target=v[2], value=4))

  output = list(nodes=nodes, links=links)
  output = jsonlite::prettify(jsonlite::toJSON(output, auto_unbox=TRUE), indent=2L)

  if (missing(file)) return(output)
  if (is.character(file)) {
    f = file(file, "w")
    writeLines(output, con=f)
    close(f)
  } else if (inherits(file, "file")) {
    writeLines(output, con=file)
  } else {
    return(output)
  }
}